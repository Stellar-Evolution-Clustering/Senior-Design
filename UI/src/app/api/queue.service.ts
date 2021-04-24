import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IClusterRequest } from './models/cluster-request.model';
import { Queue } from './models/queue.model';

@Injectable({
  providedIn: 'root',
})
export class QueueService {
  private backendUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  addClusterRequestToQueue(body: IClusterRequest): Observable<Queue> {
    return this.http.post<Queue>(`${this.backendUrl}/queue`, body);
  }

  getCurrentQueue(): Observable<Queue[]> {
    return this.http.get<any[]>(`${this.backendUrl}/queue`);
  }

  deleteFromQueue(queueId: string): Observable<any> {
    return this.http.delete(`${this.backendUrl}/cluster/${queueId}`);
  }
}
