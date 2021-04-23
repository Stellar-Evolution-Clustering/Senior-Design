import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
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
  @Input() timeStepControl: FormControl;
  @Input() timeIntervalControl: FormArray;

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
      this.timeIntervalControl.enable();
      this.timeStepControl.disable();
    } else {
      this.timeStepControl.enable();
      this.timeIntervalControl.disable();
    }
  }

}
