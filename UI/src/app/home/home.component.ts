import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { IClusterRequest } from '../api/models/cluster-request.model';
import { Queue } from '../api/models/queue.model';
import { QueryService } from '../api/query.service';
import { QueueService } from '../api/queue.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  queue: Observable<Queue[]>;

  trackByQueueId = (index, queue) => queue.id;

  constructor(
    private queryService: QueryService,
    private queueService: QueueService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.setupHttpQuery();
  }

  requery(request: IClusterRequest) {
    console.log(request);
    this.queueService.addClusterRequestToQueue(request).subscribe((value) => {
      this.snackBar.open('Added to Queue');
    });
  }

  setupHttpQuery() {
    this.queue = timer(0, 5000).pipe(
      mergeMap(() => {
        return this.queueService.getCurrentQueue();
      })
    );
  }

  deleteCluster(queryId: string) {
    this.queueService.deleteFromQueue(queryId).subscribe((value) => {
      this.snackBar.open('Deleted from Queue');
    });
  }
}
