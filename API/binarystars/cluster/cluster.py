from binarystars.models import BinaryStars
from binarystars.serializers import BinaryStarsSerializer
import numpy as np
from sklearn.cluster import KMeans, DBSCAN
from sklearn import preprocessing
import binarystars.cluster.clusteredstar as cstar

DATA_PROCESSORS = {
    "minmax": preprocessing.MinMaxScaler(),
    "abs": preprocessing.MaxAbsScaler(),
    "standard": preprocessing.StandardScaler()
}

def preprocess_data(data: np.ndarray, standarizer: str) -> np.ndarray:
    return DATA_PROCESSORS[standarizer].fit_transform(data)

# TODO: Figure out how to determine attributes from k-v pair given by frontend
# key = name of attribute
# value = weight of attribute
def determine_attributes(attri: list):
    return None

def get_stars(n_clusters: int=None, n_samples: int=None, eps: float=None, standarizer: str=None, 
                cluster_type: str=None, attributes: dict=None) -> list:
    binarystars = BinaryStars.objects.order_by('file_id', 'id', 'time_id').distinct('file_id', 'id')
    bs_serialzer = BinaryStarsSerializer(binarystars, many=True)
    
    stars_arr = []
    ids = []
    
    cluster_properties = determine_attributes(attri=list(attributes.keys()))
    weights = [attributes[key] for key in attributes]
    
    # logic will have to change here... need to use given attributes...
    for bss in binarystars:
        mass_diff = bss.mass_1 - bss.mass_2
        lumin_diff = bss.lumin_1 - bss.lumin_2
        porb = bss.porb
        ids.append((bss.file_id, bss.id, bss.time_id))
        stars_arr.append([mass_diff, lumin_diff, porb]) # 3 variables. Mass difference, Lumin difference, orbitial period
    
    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    copy_stars = None
    
    if standarizer:
        copy_stars = np.copy(stars_arr) # make a copy with unscaled values
        stars_arr = preprocess_data(data=stars_arr, standarizer=standarizer)
    
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
    
    ttt = True
    for i in range(len(clust)):
        cluster_attributes = cstar.ClusterAttributes(idx=int(clust[i]), attributes=None)
        clustered_star = cstar.ClusteredStar(key=ids[i], cluster_attributes=cluster_attributes, binarystar=bs_serialzer.data)
        # above two are what we will eventually use... below is old hard code
        
        id_cluster_dict = {}
        id_cluster_dict['key'] = ids[i]
        id_cluster_dict['cluster_idx'] = int(clust[i])
        
        # if we standarized, the graph will probably want the unstandardized values to show to the users... if not, this check is not needed
        if standarizer:
            id_cluster_dict['coords'] = { "mass_diff": copy_stars[i][0], "lumin_diff": copy_stars[i][1], "porb": copy_stars[i][2] } 
        else:
            id_cluster_dict['coords'] = { "mass_diff": stars_arr[i][0], "lumin_diff": stars_arr[i][1], "porb": stars_arr[i][2] }
        
        cluster_dict_list.append(id_cluster_dict)
    
    return cluster_dict_list

def kmeans_cluster(data: np.ndarray, k: int=3, weights=None) -> np.ndarray:
    return KMeans(n_clusters=k).fit_predict(X=data, sample_weight=weights)

def dbscan_cluster(data: np.ndarray, eps: float=0.5, min_samples: int=5, weights=None) -> np.ndarray:
    return DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X=data, sample_weight=weights)
