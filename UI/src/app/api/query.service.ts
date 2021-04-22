import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, filter, map, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Attribute } from './models/attribute.model';
import { IClusterRequest } from './models/cluster-request.model';
import { ClusterBinaryStar, ClusterBinaryStarTimesteps } from './models/clustered-binary-star.model';

@Injectable()
export class QueryService {
  private backendUrl = environment.apiUrl;

  private attributes = new BehaviorSubject<Attribute[]>(null);

  constructor(private http: HttpClient) {
    this._getAttributes().subscribe((value) => {
      this.attributes.next(value);
    });
  }

  getTestQuery(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/cluster`).pipe(
      tap((_) => console.log('sending query to backend')),
      catchError(this.handleError<any>('getTestQuery', null))
    );
  }

  private _getAttributes(): Observable<Attribute[]> {
    return this.http.get<String[]>(`${this.backendUrl}/attributes`).pipe(
      tap((_) => console.log('getting query from backend')),
      catchError(this.handleError<any>('getAttributes', null))
    );
  }

  getAttributes(): Observable<Attribute[]> {
    return this.attributes.pipe(filter((value) => value != null));
  }

  getAttributeKeys(): Observable<string[]> {
    return this.getAttributes().pipe(
      map((attributes) => {
        return attributes.map((attribute) => attribute.database_name);
      })
    );
  }

  postQuery(body: IClusterRequest): Observable<ClusterBinaryStarTimesteps> {
    return this.http
      .post<ClusterBinaryStarTimesteps>(`${this.backendUrl}/cluster`, body)
      .pipe(
        tap((_) => console.log('posting query to backend')),
        tap((_) => console.log(body)),
        catchError(this.handleError<any>('postQuery failed', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  toQueryPararms(request: IClusterRequest): any {
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
    params['database'] = request.database;
    params['temporal_val'] = null;

    return params;
  }

  fromQueryParamsAsync(params: any): Observable<IClusterRequest> {
    return this.getAttributeKeys().pipe(
      map((attributeKeys) => {
        return this.fromQueryParams(params, attributeKeys);
      })
    );
  }

  fromQueryParams(params: any, attributeKeys: string[]): IClusterRequest {
    const attr = {};
    for (let key of Object.keys(params)) {
      if (attributeKeys.includes(key) && key != "time_steps") {
        attr[key] = Number(params[key]);
      }
    }

    return {
      attributes: attr,
      cluster_type: params?.cluster_type,
      eps: Number(params?.eps),
      n_samples: Number(params?.n_samples),
      n_clusters: Number(params?.n_clusters),
      standardizer: params?.standardizer,
      time_steps: +params.time_steps,
      database: params?.database,
      temporal_val: params?.temporal_val,
    };
  }
}
