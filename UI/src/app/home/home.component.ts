import { Component, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IClusterRequest } from '../api/models/cluster-request.model';
import { Queue } from '../api/models/queue.model';
import { QueryService } from '../api/query.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  queue: Observable<Queue[]>;

  trackByQueueId = (index, queue) => queue.id;

  constructor(private queryService: QueryService) {
    this.queue = timer(0, 5000).pipe(
      mergeMap(() => {
        return this.queryService.getCurrentQueue();
      })
    );
  }

  ngOnInit(): void {}

  requery(request: IClusterRequest) {
    console.log(request);
    this.queryService.postQuery(request).subscribe();
  }
}
