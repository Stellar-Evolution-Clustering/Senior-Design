from django.db.models import F
from binarystars.models import InterpolatedBinaryStars
import numpy as np
from random import randint
from sklearn.cluster import KMeans, DBSCAN
from sklearn import preprocessing
import binarystars.cluster.clusteredstar as cstar

MAX_ROWS = 1001  # might have to change this to be a calculation like what is done in interpolate.py
LOWER_SEED_BOUND = 1
# 2^31 .. just using a number that is high to try and get a good amount of
UPPER_SEED_BOUND = 2147483648

DATA_PROCESSORS = {
    "minmax": preprocessing.MinMaxScaler(),

    "abs": preprocessing.MaxAbsScaler(),
    "standard": preprocessing.StandardScaler()
}


def preprocess_data(data: np.ndarray, standardizer: str) -> np.ndarray:
    return DATA_PROCESSORS[standardizer].fit_transform(data)


def get_stars(n_clusters: int = None, n_samples: int = None, eps: float = None, standardizer: str = None,
              cluster_type: str = None, attributes: dict = None, time_steps: int = 1, start_ts: int = 1) -> list:

    if not standardizer:
        standardizer = 'standard'

    # user will give 1-indexed value. Need to convert to 0 indexed before doing anything else.
    start_ts = start_ts - 1
    end_ts = start_ts + time_steps
    binarystars = InterpolatedBinaryStars.objects.annotate(time_id_mod=(F('time_id') - 1) % MAX_ROWS).filter(
        time_id_mod__range=(start_ts, end_ts - 1)).order_by('time_id')
    """
        This is equivalent to the following SQL query:
        
        SELECT * FROM interpolated_binary_stars
        WHERE MOD(time_id - 1, 1001) BETWEEN $start_ts AND $end_ts - 1
        ORDER BY time_id;
        
        This gets all of the wanted stars and the desired time steps for each star in the table
        We have to use 'time_id - 1' because time_id starts at 1 instead of 0.
    """

    attribute_list = list(attributes.keys())
    weights = np.array([attributes[key] for key in attributes])

    seed = randint(LOWER_SEED_BOUND, UPPER_SEED_BOUND)
    clustered_times = {'timesteps': []}
    # cluster multiple times. Each time step will line up between the stars!! Yay!
    # when 'time_steps' is large, this will be slow!!
    for i in range(time_steps):
        # slice QuerySet by time_step value so we get the right stars
        bss = binarystars[i::time_steps]
        clustered_times['timesteps'].append(cluster_stars(stars=bss, attributes=attribute_list, weights=weights,
                                                          cluster_type=cluster_type, n_clusters=n_clusters, standardizer=standardizer,
                                                          n_samples=n_samples, eps=eps, seed=seed))

    return clustered_times

# perform clustering here


def cluster_stars(stars, attributes, weights, cluster_type, n_clusters, standardizer, n_samples, eps, seed) -> list:

    # can't use values_list any more because these aren't QuerySets, they are lists
    stars_arr = [[getattr(star, att) for att in attributes] for star in stars]
    ids = [(getattr(star, 'file_id'), getattr(star, 'id'),
            getattr(star, 'time_id')) for star in stars]

    stars_arr = np.array(stars_arr)  # convert to numpy array for clustering
    # standardize data to make sure all attributes are treated equally
    processed_stars = preprocess_data(
        data=stars_arr, standardizer=standardizer)

    # Multiplies columns of p_stars by each weight. First column needs first weight and nth column needs nth weight.
    processed_stars *= weights

    clust = None
    if cluster_type == 'kmeans':
        if n_clusters:
            clust = kmeans_cluster(data=processed_stars,
                                   k=n_clusters, seed=seed)
        else:
            clust = kmeans_cluster(data=processed_stars, seed=seed)
    elif cluster_type == 'dbscan':
        if n_samples and eps:
            clust = dbscan_cluster(data=processed_stars,
                                   min_samples=n_samples, eps=eps)
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

        clustered_star = cstar.ClusteredStar(
            key=ids[i], idx=int(item), cluster_attributes=cluster_att_dict)
        cluster_dict_list.append(clustered_star.to_json())

    return cluster_dict_list


def kmeans_cluster(data: np.ndarray, seed: int, k: int = 3) -> np.ndarray:
    return KMeans(n_clusters=k, random_state=seed).fit_predict(X=data)


def dbscan_cluster(data: np.ndarray, eps: float = 0.05, min_samples: int = 5) -> np.ndarray:
    return DBSCAN(eps=eps, min_samples=min_samples).fit_predict(X=data)
