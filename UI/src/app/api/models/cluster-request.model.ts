export interface IClusterRequest {
  n_clusters?: number; //Needed if doing cluster_type = KMeans
  n_samples?: number; // Need if doing cluster_type = DBScan
  eps?: number; // Need if doing cluster_type = DBScan
  standardizer?: DataProcessors; //Optional for data processing
  cluster_type: ClusterType; //Cluster type is required
  attributes: any; // { 'db_name': weight.00 }
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
    eps: null,
    n_clusters: 3,
    n_samples: null,
    standardizer: DataProcessors.Standard,
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
