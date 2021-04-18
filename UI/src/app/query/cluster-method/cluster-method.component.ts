import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClusterType } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-cluster-method',
  templateUrl: './cluster-method.component.html',
  styleUrls: ['./cluster-method.component.scss']
})
export class ClusterMethodComponent implements OnInit {

  algorithms = [ 
    { name: ClusterType.d_KMeans, value: ClusterType.KMeans}, 
    { name: ClusterType.d_DBScan, value: ClusterType.DBScan}
  ];
  
  @Input() fc: FormControl;

  constructor() { }

  ngOnInit(): void {
  }
}
