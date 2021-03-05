import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-cluster-method',
  templateUrl: './cluster-method.component.html',
  styleUrls: ['./cluster-method.component.scss']
})
export class ClusterMethodComponent implements OnInit {

  algorithms : string[] = [
    "K-means",
    "DBScan",
  ];
  
  @Input() fc: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
