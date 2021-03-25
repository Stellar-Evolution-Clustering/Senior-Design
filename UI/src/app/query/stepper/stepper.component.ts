import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormArray, FormGroup, Validators} from '@angular/forms';
import {ENTER} from '@angular/cdk/keycodes';
import { MatChipSelectionChange } from '@angular/material/chips';
import { QueryService } from '../../api/query.service'
import { Observable } from 'rxjs';
import { Variable } from '../../api/models/variable.model';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss']
})
export class StepperComponent implements OnInit {

  /*attributes : Value[] = [
    {display:'Helium', value:'Helium'},
    {display:'Mass', value:'Mass'},
    {display:'Luminosity', value:'Luminosity'},
  ];*/

  attributes : Observable<any>;

  query = this.fb.group({
    dbSelect: ['',  Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([]), //replace with custom validator to check that weights are valid values? (i.e. no out of bounds values and ensureing that all weights add up to 1.00?)
    distFunct: ['',  Validators.required],
    algorithm: ['',  Validators.required]
  });

  constructor(private fb: FormBuilder, private queryService: QueryService) {
    
  }

  ngOnInit() {
    this.attributes = this.queryService.getAttributes();
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

  addAttribute(name: string): void {
    this.attr.push(this.fb.control(name)); //push the attribute to the attribute array
    this.weigh.push(this.fb.control('', Validators.required));
  }

  deleteAttribute(name: string): void {
    for (let index = 0; index < this.attr.length; index++) {
      if (this.attr.controls[index].value == (name)) {
        this.attr.removeAt(index);
        this.weigh.removeAt(index);
        break;
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
