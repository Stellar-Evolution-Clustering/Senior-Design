import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Attribute } from './models/attribute.model';
import {
  ClusterType,
  DataProcessors,
  IClusterRequest,
} from './models/cluster-request.model';
import { ClusterBinaryStar } from './models/clustered-binary-star.model';

@Injectable()
export class QueryService {
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getTestQuery(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}/cluster`).pipe(
      tap((_) => console.log('sending query to backend')),
      catchError(this.handleError<any>('getTestQuery', null))
    );
  }

  getAttributes(): Observable<Attribute[]> {
    return this.http.get<String[]>(`${this.backendUrl}/attributes`).pipe(
      tap((_) => console.log('sending query to backend')),
      catchError(this.handleError<any>('getAttributes', null))
    );
  }

  postQuery(body: IClusterRequest): Observable<ClusterBinaryStar[]> {
    // Here's the post body. It's a Javascript object which is automatically translated into a JSON object by post()
    // var body = {
    //   "data1": 1,
    //   "data2": 2
    //   "data3": [
    //      "data3.1": "hello",
    //      "data3.2": "there"
    //   ]
    // };
    return this.http
      .post<ClusterBinaryStar>(`${this.backendUrl}/cluster`, body)
      .pipe(
        tap((_) => console.log('posting query to backend')),
        catchError(this.handleError<any>('postQuery', null))
      );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
