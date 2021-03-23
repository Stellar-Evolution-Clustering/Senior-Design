class ClusteredStar(object):
    """ Object representing a Clustered Binary Star system. 
    Will be returned to the frontend for graphing purposes

    """
    def __init__(self, key, idx, cluster_attributes, binarystar) -> None:
        """Constructor for ClustedStar object. Creates a new ClusteredStar object with given args

        Args:
            key (Tuple(int, int, int)): Unique indentifier key to determine which star this object is
            cluster_attributes (ClusterAttributes): All of the attributes that were used to cluster this bss and which cluster it is in
            binarystar (BinaryStarsSerializer): All of the binary star information from this binary star, including what was not used
            in clustering.
        """
        self.key = key
        self.cluster_idx = idx
        self.cluster_attributes = cluster_attributes
        self.binarystar = binarystar
        
    def to_json(self):
        return self.__dict__

