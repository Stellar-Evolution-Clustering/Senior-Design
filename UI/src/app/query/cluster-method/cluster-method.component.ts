import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClusterType } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-cluster-method',
  templateUrl: './cluster-method.component.html',
  styleUrls: ['./cluster-method.component.scss']
})
export class ClusterMethodComponent implements OnInit {

  algorithms : ClusteringMethod[] = [
    {
      displayName: "K-Means",
      type: ClusterType.KMeans
    },
    {
      displayName: "DBScan",
      type: ClusterType.DBScan
    }
  ];
  
  @Input() fc: FormControl;

  constructor() { }

  ngOnInit(): void {
  }
}

export interface ClusteringMethod {
  displayName: string;
  type: ClusterType;
}
