import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-distance-func',
  templateUrl: './distance-func.component.html',
  styleUrls: ['./distance-func.component.scss']
})
export class DistanceFuncComponent implements OnInit {

  distFunctions : string[] = [
    "Function #1",
    "Function #2",
    "Function #3",
  ];

  @Input() fc: FormControl;

  constructor() { }

  ngOnInit(): void {
  }

}
