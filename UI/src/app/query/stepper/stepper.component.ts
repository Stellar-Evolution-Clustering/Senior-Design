import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChipSelectionChange } from '@angular/material/chips';

interface Value {
  display: string;
  value: string | number;
}

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {
  databases : Value[] = [
    {display:'COSMIC', value:'COSMIC'},
    {display:'Database #2', value:'DB2'},
    {display:'Database #3', value:'DB3'},
  ]; //todo update with actual database names

  attributes : Value[] = [
    {display:'Helium', value:'Helium'},
    {display:'Mass', value:'Mass'},
    {display:'Luminosity', value:'Luminosity'},
  ]; //todo update values with actual attribute names in db
  //todo add remaining attributes

  query = this.fb.group({
    dbSelect: ['',  Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([]), //replace with custom validator to check that weights are valid values? (i.e. no out of bounds values and ensureing that all weights add up to 1.00?)
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

  onSubmit() {
    // TODO: Use EventEmitter with form value
    
    const json = {
      "db": this.query.get('dbSelect').value as string,
      "attributes": [],
      "distFunct": this.query.get('distFunct').value as string,
      "clustering": this.query.get('algorithm').value as string,
    }
    for (let index = 0; index < this.attr.length; index++) {
      json.attributes.push({"attr": this.attr.controls[index].value.display, "weight": this.weigh.controls[index].value});
    }

    console.info(JSON.stringify(json));
  }

  selected(event: MatChipSelectionChange): void {
    if(event.selected) {
      this.attr.push(this.fb.control(event.source.value)); //push the attribute to the attribute array
      this.weigh.push(this.fb.control('', Validators.required));
      
    } else {
      for (let index = 0; index < this.attr.length; index++) {
        if (this.attr.controls[index].value == (event.source.value)) {
          this.attr.removeAt(index);
          this.weigh.removeAt(index);
          break;
        }
        
      }

    }
  }

  print(): void {
    console.info("Here");
    console.info(this.query.value);
  }

  
  get attr(): FormArray {
    return this.query.get('attributes') as FormArray;
  }
  
  get weigh() {
    return this.query.get('weights') as FormArray;
  }
}
