import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  @Input() public weightAttributes: string[];
  @Input() weightArray: FormArray;
  @Input() attributeArray: FormControl[];

  constructor() { }

  ngOnInit(): void {
  }

  get selected(): FormControl[] {
    return this.attributeArray as FormControl[];
  }

}
