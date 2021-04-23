export interface IClusterRequest {
  n_clusters?: number; //Needed if doing cluster_type = KMeans
  n_samples?: number; // Need if doing cluster_type = DBScan
  eps?: number; // Need if doing cluster_type = DBScan
  standardizer?: DataProcessors; //Optional for data processing
  cluster_type: ClusterType; //Cluster type is required
  time_steps: number; // Specifies the number of time steps to cluster
  attributes: any; // { 'db_name': weight.00 }
  database?: Database;
  time_steps?: number;
  time_interval?: any;
  starting_time_step?: number;
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
  POSYDON  = 'POSYDON ',
}
