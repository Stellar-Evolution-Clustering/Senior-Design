export interface IClusterRequest {
  n_clusters?: number; //Needed if doing cluster_type = KMeans
  n_samples?: number; // Need if doing cluster_type = DBScan
  eps?: number; // Need if doing cluster_type = DBScan
  standardizer?: DataProcessors; //Optional for data processing
  cluster_type: ClusterType; //Cluster type is required
  attributes: any; // { 'db_name': weight.00 }
  database?: Database; //Should make this and temporal_val non-null once it's working on backend
  temporal_val?: any;
}

export enum ClusterType {
  DBScan = 'dbscan',
  KMeans = 'kmeans',
  d_DBScan = 'DBScan',
  d_KMeans = 'K-Means',
}

export enum DataProcessors {
  MinMax = 'minmax',
  ABS = 'abs',
  Standard = 'standard',
  d_MinMax = 'MinMax',
  d_ABS = 'ABS',
  d_Standard = 'Standard',
}

export enum Database {
  COSMIC = 'COSMIC',
  DB2 = 'Database #2',
  DB3 = 'Database #3',
}
