export interface IClusterRequest {
  n_clusters?: number; //Needed if doing cluster_type = KMeans
  n_samples?: number; // Need if doing cluster_type = DBScan
  eps?: number; // Need if doing cluster_type = DBScan
  standardizer?: DataProcessors; //Optional for data processing
  cluster_type: ClusterType; //Cluster type is required
  attributes: any; // { 'db_name': weight.00 }
  time_steps: number; // Specifies the number of time steps to cluster
}

export function toQueryPararms(request: IClusterRequest): any {
  var params = {};
  for (let attributeKey of Object.keys(request.attributes)) {
    params[attributeKey] = request.attributes[attributeKey];
  }
  params['cluster_type'] = request.cluster_type;
  params['n_clusters'] = request.n_clusters;
  params['eps'] = request.eps;
  params['n_samples'] = request.n_samples;
  params['standardizer'] = request.standardizer;
  params['time_steps'] = request.time_steps;

  return params;
}

export function fromQueryParams(params: any): IClusterRequest {
  const attr = {};
  for (let key of Object.keys(params)) {
    if (!isNaN(params[key])) {
      attr[key] = params[key];
    }
  }
  return {
    attributes: attr,
    cluster_type: params.cluster_type,
    n_clusters: 3,
    standardizer: DataProcessors.Standard,
    time_steps: +params.time_steps,
  };
}

export enum ClusterType {
  DBScan = 'dbscan',
  KMeans = 'kmeans',
}

export enum DataProcessors {
  MinMax = 'minmax',
  ABS = 'abs',
  Standard = 'standard',
}
