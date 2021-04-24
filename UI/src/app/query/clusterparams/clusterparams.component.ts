import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ClusterType, DataProcessors } from 'src/app/api/models/cluster-request.model';

@Component({
  selector: 'app-clusterparams',
  templateUrl: './clusterparams.component.html',
  styleUrls: ['./clusterparams.component.scss']
})
export class ClusterparamsComponent implements OnInit {

  @Input() paramsControl: FormGroup;

  @Input() clusterType: ClusterType;

  useInterval: boolean = false;

  standardizers = [ 
    { name: DataProcessors.d_Standard, value: DataProcessors.Standard}, 
    { name: DataProcessors.d_ABS, value: DataProcessors.ABS},
    { name: DataProcessors.d_MinMax, value: DataProcessors.MinMax}
  ];

  constructor() { }

  ngOnInit(): void {
  }

  useIntervalChanged(event: MatCheckboxChange) {
    if (event.checked) {
      this.paramsControl.get('time_interval').enable();
      this.paramsControl.get('temporal_val').disable({emitEvent: false});
    } else {
      this.paramsControl.get('temporal_val').enable();
      this.paramsControl.get('time_interval').disable({emitEvent: false});
    }
  }

}
