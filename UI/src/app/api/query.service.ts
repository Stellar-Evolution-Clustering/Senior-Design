import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class QueryService {

  private backendUrl = 'http://localhost:8000/api/binarystars/cluster';

  constructor(private http: HttpClient) { }

  getTestQuery(): Observable<any> {
    return this.http.get<any>(`${this.backendUrl}`).pipe(
      tap(_ => console.log("sending query to backend")),
      catchError(this.handleError<any>('getTestQuery', null))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
     console.error(error);

     console.log(`${operation} failed: ${error.message}`);

     return of(result as T);
   }
 }
}
