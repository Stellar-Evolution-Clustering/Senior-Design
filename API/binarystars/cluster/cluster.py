# initial clustering file just to cluster some binary stars together. Will need to combine with API soon
from binarystars.models import BinaryStars
# from binarystars.serializers import BinaryStarsSerializer # not sure if needed yet...
import numpy as np
from sklearn.cluster import KMeans


# default to mass ratio, luminosity ratio, and orbital period
def get_stars():
    #binarystars = BinaryStars.objects.all()[0:10]
    return None

def kmeans_cluster(k=8):
    return None
