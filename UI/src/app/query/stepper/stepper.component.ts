import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChipSelectionChange } from '@angular/material/chips';

interface Value {
  display: string;
  value: string | number;
}

interface Parameter {
  name: string,
  value: string,
  weight: number
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  databases : Value[] = [
    {display:'Database #1', value:'DB1'},
    {display:'Database #2', value:'DB2'},
    {display:'Database #3', value:'DB3'},
  ]; //todo update with actual database names

  attributes : Value[] = [
    {display:'Helium', value:'Helium'},
    {display:'Mass', value:'Mass'},
    {display:'Luminosity', value:'Luminosity'},
  ]; //todo update values with actual attribute names in db
  //todo add remaining attributes

  weights : Value[] = [];

  query = this.fb.group({
    dbSelect: ['',  Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([], Validators.required), //replace with custom validator to check for all weights?
    distFunct: ['',  Validators.required],
    algorithm: ['',  Validators.required]
  });
  
  distFunctions : Value[] = [
    {display:'Function #1', value:'Funct1'},
    {display:'Function #2', value:'Funct2'},
    {display:'Function #3', value:'Funct3'},
  ];

  algorithms : Value[] = [
    {display:'K-means', value:'kmeans'},
    {display:'DBScan', value:'dbscan'},
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    
  }

  selected(event: MatChipSelectionChange): void {
    //this.fruits.push(event.option.viewValue);
    if(event.selected) {
      this.weights.push({display: (event.source.value as string), value: this.weigh.length}); //use the future index of the weight in the formarray as the value
      this.attr.push(this.fb.control(event.source.value)); //push the attribute to the attribute array
      this.weigh.push(this.fb.control(''))
      
    } else {
      //todo iterate through arrays and remove attribute
    }
  }

  print(): void {
    console.info("Here");
    console.info(this.query.value);
  }

  
  get attr() {
    return this.query.get('attributes') as FormArray;
  }
  
  get weigh() {
    return this.query.get('weights') as FormArray;
  }
}
