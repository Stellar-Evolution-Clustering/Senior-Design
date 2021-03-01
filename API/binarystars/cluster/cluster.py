# initial clustering file just to cluster some binary stars together. Will need to combine with API soon
from binarystars.models import BinaryStars
import numpy as np
from sklearn.cluster import KMeans, DBSCAN


# default to mass ratio, luminosity ratio, and orbital period
def get_stars(clusters: int, star_cnt=100, normalize=None, cluster_type='kmeans') -> dict:
    binarystars = BinaryStars.objects.all()[0:star_cnt]
    time_ids = []
    stars_arr = []
    if normalize:
        print("normalize data first condition")
    for bss in binarystars:
        mass_ratio = bss.mass_1 / bss.mass_2
        lumin_ratio = bss.lumin_1 / bss.lumin_2
        porb = bss.porb
        time_ids.append(bss.time_id) # get id for dictionary
        stars_arr.append([mass_ratio, lumin_ratio, porb]) # 3 variables. Mass ratio, Lumin ratio, orbitial period
        
    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    clust = None
    if cluster_type == 'kmeans':
        clust = kmeans_cluster(data=stars_arr, k=clusters)
    elif cluster_type == 'dbscan':
        clust = dbscan_cluster(data=stars_arr)
    
    
    id_cluster_dict = {}
    for i in range(len(clust.labels_)):
        id_cluster_dict[time_ids[i]] = int(clust.labels_[i])
    
    return id_cluster_dict

def kmeans_cluster(data, k=8, weights=None) -> KMeans:
    return KMeans(n_clusters=k).fit(X=data, sample_weight=weights)

def dbscan_cluster(data, eps=0.5, min_samples=5, weights=None) -> DBSCAN:
    return DBSCAN(eps=eps, min_samples=min_samples).fit(X=data, sample_weight=weights)
