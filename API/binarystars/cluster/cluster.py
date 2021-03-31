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
    
    binarystars = BinaryStars.objects.order_by('file_id', 'id', 'time_id').distinct('file_id', 'id')
    stars_arr = []
    ids = []
    attribute_list = list(attributes.keys())
    bss_att_list = []
    
    # TODO: implement weights soon
    # weights = [attributes[key] for key in attributes]
    
    for bss in binarystars:
        clust_att_list = []
        for attribute in attribute_list:
            clust_att_list.append(getattr(bss, attribute))
        ids.append((bss.file_id, bss.id, bss.time_id))
        stars_arr.append(clust_att_list)
        
        all_att_dict = {}
        for att in bss.__dict__:
            if att != '_state':
                all_att_dict[att] = getattr(bss, att)
        bss_att_list.append(all_att_dict)
    
    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    copy_stars = None
    
    if standardizer:
        copy_stars = np.copy(stars_arr) # make a copy with unscaled values
        stars_arr = preprocess_data(data=stars_arr, standardizer=standardizer)
    
    clust = None
    if cluster_type == 'kmeans':
        if n_clusters:
            clust = kmeans_cluster(data=stars_arr, k=n_clusters)
        else:
            clust = kmeans_cluster(data=stars_arr)
    elif cluster_type == 'dbscan':
        if n_samples and eps:
            clust = dbscan_cluster(data=stars_arr, min_samples=n_samples, eps=eps)
        elif n_samples:
            clust = dbscan_cluster(data=stars_arr, min_samples=n_samples)
        elif eps:
            clust = dbscan_cluster(data=stars_arr, eps=eps)
        else:
            clust = dbscan_cluster(data=stars_arr)
    
    cluster_dict_list = []
    
    for i in range(len(clust)):
        cluster_att_dict = {}
        if standardizer:
            for j in range(len(attribute_list)):
                cluster_att_dict[attribute_list[j]] = copy_stars[i][j]
        else:
            for j in range(len(attribute_list)):
                cluster_att_dict[attribute_list[j]] = stars_arr[i][j]
        
        clustered_star = cstar.ClusteredStar(key=ids[i], idx=int(clust[i]), cluster_attributes=cluster_att_dict, binarystar=bss_att_list[i])
        cluster_dict_list.append(clustered_star.to_json())
    
    return cluster_dict_list

def kmeans_cluster(data: np.ndarray, k: int=3, weights=None) -> np.ndarray:
    return KMeans(n_clusters=k).fit_predict(X=data, sample_weight=weights)

def dbscan_cluster(data: np.ndarray, eps: float=0.5, min_samples: int=5, weights=None) -> np.ndarray:
    return DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X=data, sample_weight=weights)
