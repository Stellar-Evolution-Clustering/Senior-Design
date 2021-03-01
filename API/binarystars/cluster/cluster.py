# initial clustering file just to cluster some binary stars together. Will need to combine with API soon
from binarystars.models import BinaryStars
import numpy as np
from sklearn.cluster import KMeans


# default to mass ratio, luminosity ratio, and orbital period
def get_stars(clusters: int) -> dict:
    binarystars = BinaryStars.objects.all()[0:100]
    time_ids = []
    stars_arr = []
    for bss in binarystars:
        mass_ratio = bss.mass_1 / bss.mass_2
        lumin_ratio = bss.lumin_1 / bss.lumin_2
        porb = bss.porb
        time_ids.append(bss.time_id) # get id for dictionary
        stars_arr.append([mass_ratio, lumin_ratio, porb]) # 3 variables. Mass ratio, Lumin ratio, orbitial period
        
    stars_arr = np.array(stars_arr) # convert to numpy array for clustering
    kmeans = kmeans_cluster(data=stars_arr, k=clusters)
    id_cluster_dict = {}
    for i in range(len(kmeans.labels_)):
        id_cluster_dict[time_ids[i]] = int(kmeans.labels_[i])
    
    return id_cluster_dict

def kmeans_cluster(data, k=8, weights=None):
    return KMeans(n_clusters=k).fit(data, weights) # cluster! For now, equal weights
