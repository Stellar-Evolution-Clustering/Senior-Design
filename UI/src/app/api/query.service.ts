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
      tap((_) => console.log('getting query from backend')),
      catchError(this.handleError<any>('getTestQuery', null))
    );
  }

  // I think this is a one time thing ? not to be used by the UI
    // getInterpolatedData(): Observable<any> {
    //   return this.http.get<any>(`${this.backendUrl}/interpolate`).pipe(
    //     tap((_) => console.log('getting interpolated data')),
    //     catchError(this.handleError<any>('getTestQuery', null))
    //   );
    // }

  postQuery(body: IClusterRequest): Observable<ClusterBinaryStar[]> {
    return this.http
      .post<ClusterBinaryStar>(`${this.backendUrl}/cluster`, body)
      .pipe(
        tap((_) => console.log('posting query to backend')),
        tap((_) => console.log(body)),
        catchError(this.handleError<any>('getTestQuery', null))
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
