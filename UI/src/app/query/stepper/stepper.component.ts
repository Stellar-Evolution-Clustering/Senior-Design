import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn } from '@angular/forms';
import { QueryService } from '../../api/query.service';
import { Observable } from 'rxjs';
import { Attribute } from '../../api/models/attribute.model';
import {
  ClusterType,
  DataProcessors,
  IClusterRequest,
  toQueryPararms,
} from 'src/app/api/models/cluster-request.model';
import { Router } from '@angular/router';
import { build$ } from 'protractor/built/element';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  //attributes: Observable<Attribute[]>;

  query = this.fb.group({
    dbSelect: ['', Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([], [emptyWeights()]), //replace with custom validator to check that weights are valid values? (i.e. no out of bounds values and ensureing that all weights add up to 1.00?)
    distFunct: ['', Validators.required],
    algorithm: ['', Validators.required],
  });

  querySummary: IClusterRequest = this.buildRequestTemplate();
  isWeightStepComplete: boolean = false;

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private router: Router
  ) {}

  ngOnInit() {
    //this.attributes = this.queryService.getAttributes();
  }

  buildRequestTemplate(): IClusterRequest {
    var attributes = {};
    for (let index = 0; index < this.attributes.length; index++) {
      attributes[
        this.attributes.controls[index].value.database_name
      ] = this.weights.controls[index].value;
    }

    return <IClusterRequest>{
      cluster_type: this.query.get('algorithm').value as ClusterType,
      n_clusters: null,
      eps: null,
      n_samples: null,
      standardizer: DataProcessors.Standard,
      attributes: attributes,
    };
  }

  buildAttributeDisplayArr(): any[] {
    //used to pass display names and weights to the query summary
    var attributes: any[] = [];
    
    for (let index = 0; index < this.attributes.length; index++) {
      var cur = {
            name: this.attributes.controls[index].value.display_name, 
            weight: this.weights.controls[index].value
      };
      attributes.push(cur);
    }
    return attributes;
  }

  onSubmit() {
    console.log('WHAT');
    const queryParams = toQueryPararms(this.buildRequestTemplate());
    console.log(queryParams);
    this.router.navigate(['/query/graph'], { queryParams: queryParams });
  }

  addAttribute(attribute: Attribute): void {
    this.attributes.push(this.fb.control(attribute)); //push the attribute to the attribute array
    this.weights.push(this.fb.control(null, [Validators.required, Validators.compose([Validators.min(0), Validators.max(100)])]));
    //for now, using perecent values (if user enters 12.34, it will be read as 12.34% or 0.1234)
  }

  deleteAttribute(attribute: Attribute): void {
    for (let index = 0; index < this.attributes.length; index++) {
      if (this.attributes.controls[index].value == attribute) {
        this.attributes.removeAt(index);
        this.weights.removeAt(index);
        break;
      }
    }
  }

  print(): void {
    console.info('Here');
    console.info(this.weights.errors);
    console.info(this.weights.valid);
  }

  get attributes(): FormArray {
    return this.query.get('attributes') as FormArray;
  }

  get weights(): FormArray {
    return this.query.get('weights') as FormArray;
  }
}

export function emptyWeights(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let isComplete = true;
    for (let index = 0; index < control.value.length; index++) {
      if (!control.value[index]) isComplete = false;
    }
    return isComplete ? null : {emptyWeights: {value: control.value}};
  };
}

export function validWeightTotal(snackBar: MatSnackBar): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let total = 0;
    for (let index = 0; index < control.value.length; index++) {
      if (!control.value[index]) total += control.value[index];
    }
    if (total == 100) {
      return null;
    } else {
      const msg = "All weights values must add up to 100";
      const action = "Dismiss";
      snackBar.open(msg, action, {
        duration: 3000,
      });
      return {validWeightTotal: {value: control.value}}
    }
  };
}