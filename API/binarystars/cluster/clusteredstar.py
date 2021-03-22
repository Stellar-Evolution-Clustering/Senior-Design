import json
from binarystars.serializers import BinaryStarsSerializer

class ClusterAttributes(object):
    def __init__(self, idx, attributes) -> None:
        """Create a new ClusterAttribute object with the given args

        Args:
            idx (int): Which cluster this clustered star belongs to
            attributes (list(dict(str, number))): List of all of the attributes used to cluster 
            a binary star for a given query given in key-value format of: 
            
                attribute_name: attribute_value 
        """
        self.idx = idx
        self.attributes = attributes
    
    def to_json(self):
        return json.dumps(self, default=lambda x: x.__dict__, sort_keys=True, indent=4)

class ClusteredStar(object):
    """ Object representing a Clustered Binary Star system. 
    Will be returned to the frontend for graphing purposes

    """
    def __init__(self, key, cluster_attributes: ClusterAttributes, binarystar: BinaryStarsSerializer) -> None:
        """Constructor for ClustedStar object. Creates a new ClusteredStar object with given args

        Args:
            key (Tuple(int, int, int)): Unique indentifier key to determine which star this object is
            cluster_attributes (ClusterAttributes): All of the attributes that were used to cluster this bss and which cluster it is in
            binarystar (BinaryStarsSerializer): All of the binary star information from this binary star, including what was not used
            in clustering.
        """
        self.key = key
        self.cluster_attributes = cluster_attributes
        self.binarystar = binarystar
    
    def to_json(self):
        return json.dumps(self, default=lambda x: x.__dict__, sort_keys=True, indent=4)

