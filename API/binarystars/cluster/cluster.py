from binarystars.models import BinaryStars
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn import preprocessing
import binarystars.cluster.clusteredstar as cstar

DATA_PROCESSORS = {
    "minmax": preprocessing.MinMaxScaler(),
    "abs": preprocessing.MaxAbsScaler(),
    "standard": preprocessing.StandardScaler()
}

def preprocess_data(data: np.ndarray, standardizer: str) -> np.ndarray:
    return DATA_PROCESSORS[standardizer].fit_transform(data)

def get_stars(n_clusters: int=None, n_samples: int=None, eps: float=None, standardizer: str=None, 
                cluster_type: str=None, attributes: dict=None) -> list:
    
    if not standardizer:
        standardizer = 'standard'
    
    binarystars = BinaryStars.objects.order_by('file_id', 'id', 'time_id').distinct('file_id', 'id')
    attribute_list = list(attributes.keys())
    
    # TODO: implement weights soon
    # weights = [attributes[key] for key in attributes]
    
    stars_arr = [[getattr(bss, attribute) for attribute in attribute_list] for bss in binarystars]
    ids = [(bss.file_id, bss.id, bss.time_id) for bss in binarystars]

    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    processed_stars = preprocess_data(data=stars_arr, standardizer=standardizer) # standardize data to make sure all attributes are treated equally
    
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
        for j, att in enumerate(attribute_list):
            cluster_att_dict[att] = stars_arr[i][j]
        
        clustered_star = cstar.ClusteredStar(key=ids[i], idx=int(item), cluster_attributes=cluster_att_dict)
        cluster_dict_list.append(clustered_star.to_json())
    
    return cluster_dict_list

def kmeans_cluster(data: np.ndarray, k: int=3, weights=None) -> np.ndarray:
    return KMeans(n_clusters=k).fit_predict(X=data, sample_weight=weights)

def dbscan_cluster(data: np.ndarray, eps: float=0.05, min_samples: int=5, weights=None) -> np.ndarray:
    return DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X=data, sample_weight=weights)
