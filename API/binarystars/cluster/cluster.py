from django.db.models import F, Q
from binarystars.models import InterpolatedBinaryStars
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn import preprocessing
import binarystars.cluster.clusteredstar as cstar

MAX_ROWS = 1001

DATA_PROCESSORS = {
    "minmax": preprocessing.MinMaxScaler(),
    "abs": preprocessing.MaxAbsScaler(),
    "standard": preprocessing.StandardScaler()
}

def preprocess_data(data: np.ndarray, standardizer: str) -> np.ndarray:
    return DATA_PROCESSORS[standardizer].fit_transform(data)

def get_stars(n_clusters: int=None, n_samples: int=None, eps: float=None, standardizer: str=None, 
                cluster_type: str=None, attributes: dict=None, time_steps: int=1) -> dict:
    
    if not standardizer:
        standardizer = 'standard'
    
    binarystars = InterpolatedBinaryStars.objects.annotate(time_id_mod=(F('time_id') - 1) % MAX_ROWS).filter(time_id_mod__range=(0, time_steps - 1)).order_by('time_id')
    
    attribute_list = list(attributes.keys())
    weights = np.array([attributes[key] for key in attributes])
    
    clustered_times = {}
    for i in range(time_steps):
        bss = binarystars[i::time_steps]
        clustered_times[i] = cluster_stars(stars=bss, attributes=attribute_list, weights=weights, 
                                            cluster_type=cluster_type, n_clusters=n_clusters, standardizer=standardizer,
                                            n_samples=n_samples, eps=eps)
    
    return clustered_times


def cluster_stars(stars, attributes, weights, cluster_type, n_clusters, standardizer, n_samples, eps) -> list:
    
    stars_arr = [[getattr(star, att) for att in attributes] for star in stars]
    # stars_arr = [att_vals for att_vals in stars.values_list(*attributes)]
    ids = [(getattr(star, 'file_id'), getattr(star, 'id'), getattr(star, 'time_id')) for star in stars]

    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    processed_stars = preprocess_data(data=stars_arr, standardizer=standardizer) # standardize data to make sure all attributes are treated equally
    
    # Multiplies columns of p_stars by each weight. First column needs first weight and nth column needs nth weight.
    processed_stars *= weights
    
    clust = None
    if cluster_type == 'kmeans':
        if n_clusters:
            clust = kmeans_cluster(data=processed_stars, k=n_clusters)
        else:
            clust = kmeans_cluster(data=processed_stars)
    elif cluster_type == 'dbscan':
        if n_samples and eps:
            clust = dbscan_cluster(data=processed_stars, min_samples=n_samples, eps=eps)
        elif n_samples:
            clust = dbscan_cluster(data=processed_stars, min_samples=n_samples)
        elif eps:
            clust = dbscan_cluster(data=processed_stars, eps=eps)
        else:
            clust = dbscan_cluster(data=processed_stars)
    
    cluster_dict_list = []
    
    for i, item in enumerate(clust):
        cluster_att_dict = {}
        for j, att in enumerate(attributes):
            cluster_att_dict[att] = stars_arr[i][j]
        
        clustered_star = cstar.ClusteredStar(key=ids[i], idx=int(item), cluster_attributes=cluster_att_dict)
        cluster_dict_list.append(clustered_star.to_json())
    
    return cluster_dict_list

def kmeans_cluster(data: np.ndarray, k: int=3) -> np.ndarray:
    return KMeans(n_clusters=k).fit_predict(X=data)

def dbscan_cluster(data: np.ndarray, eps: float=0.05, min_samples: int=5) -> np.ndarray:
    return DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X=data)
