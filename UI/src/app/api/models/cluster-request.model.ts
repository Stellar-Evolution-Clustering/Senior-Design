export interface IClusterRequest {
  n_clusters?: number; //Needed if doing cluster_type = KMeans
  n_samples?: number; // Need if doing cluster_type = DBScan
  eps?: number; // Need if doing cluster_type = DBScan
  standardizer?: DataProcessors; //Optional for data processing
  cluster_type: ClusterType; //Cluster type is required
  attributes: any; // { 'db_name': weight.00 }
  database?: Database;//Should make this and temporal_val non-null once it's working on backend
  temporal_val?: any;
}

export function toQueryPararms(request: IClusterRequest): any {
  var params = {};

  params['cluster_type'] = request.cluster_type;
  params['n_clusters'] = request.n_clusters;
  params['eps'] = request.eps;
  params['n_samples'] = request.n_samples;
  params['standardizer'] = request.standardizer;
  params['attributes'] = request.attributes;
  params['database'] = request.database;
  params['temporal_val'] = null;
  /*console.log("HEY!!!");
  console.log(attr);
  console.log(params);*/
  return params;
}

export function fromQueryParams(params: any): IClusterRequest {
  /* const attr = {};
  for (let key of Object.keys(params)) {
    if (!isNaN(params[key])) {
      attr[key] = params[key];
    }
  } */
  //console.log(params);
  return {
    attributes: params.attributes,
    cluster_type: params.cluster_type,
    eps: params.eps,
    n_samples: params.n_samples,
    n_clusters: params.n_clusters,
    standardizer: params.standardizer,
    database: params.database,
    temporal_val: params.temporal_val,
  };
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
  DB3 = 'Database #3'
}