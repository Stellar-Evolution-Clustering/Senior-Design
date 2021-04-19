import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ClusterType, DataProcessors } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-clusterparams',
  templateUrl: './clusterparams.component.html',
  styleUrls: ['./clusterparams.component.scss']
})
export class ClusterparamsComponent implements OnInit {

  @Input() clusterControl: FormControl;
  @Input() sampleControl: FormControl;
  @Input() epsControl: FormControl;
  @Input() standardizerControl: FormControl;

  @Input() clusterType: ClusterType;

  standardizers = [ 
    { name: DataProcessors.d_Standard, value: DataProcessors.Standard}, 
    { name: DataProcessors.d_ABS, value: DataProcessors.ABS},
    { name: DataProcessors.d_MinMax, value: DataProcessors.MinMax}
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
