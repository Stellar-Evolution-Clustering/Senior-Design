import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormArray, FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';

@Component({
  selector: 'app-weight',
  templateUrl: './weight.component.html',
  styleUrls: ['./weight.component.scss']
})
export class WeightComponent implements OnInit {
  @Input() public weightAttributes: string[];
  @Input() weightArray: FormArray;
  @Input() attributeArray: FormControl[];

  @Output() allowEmptyInputEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  changeInputMode(event: MatCheckboxChange) {
    this.allowEmptyInputEvent.emit(event.checked);
  }

  get selected(): FormControl[] {
    return this.attributeArray as FormControl[];
  }

}