import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators, AbstractControl, ValidatorFn, FormGroup, FormControl } from '@angular/forms';
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
  querySummary: IClusterRequest;
  allowEmptyInput: boolean = false;//FormControl = new FormControl(false);

  public query: FormGroup = this.fb.group({
    dbSelect: ['', Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([], [emptyWeights(), validWeightTotal(this.allowEmptyInput), ]), //{ validators: [emptyWeights(), validWeightTotal(this.snack), ], updateOn: 'blur'}
    distFunct: ['', Validators.required],
    algorithm: ['', Validators.required],
  });

  //TODO: Need to distribute remaining weight among empty inputs when allowEmptyInput is true

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private router: Router,
    private snack: MatSnackBar
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
            name: this.attributes.controls[index].value?.display_name, 
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

  needToShowSnackBar() {
    const action = "Dismiss";
    let msg = ""
    if (this.weights.errors?.distributeWeight) {
      msg = "Could not assign empty inputs a value!! Current input already equals 100.";
    } else if (this.weights.errors?.validWeightTotal) {
      msg = "All weights values must add up to 100!!";
    } else {
      return;
    }

    this.snack.open(msg, action, {
      duration: 3000,
    });
  }

  changeInputMode(event: boolean) {
    //event ? this.weights.clearValidators() : this.weights.setValidators([emptyWeights(), validWeightTotal(this.allowEmptyInput.value), ]);
    this.allowEmptyInput = event;
    if (event) {
      this.weights.clearValidators();
      this.weights.setValidators(validWeightTotal(this.allowEmptyInput));
    } else {
      this.weights.setValidators([emptyWeights(), validWeightTotal(this.allowEmptyInput), ]);
    }
    for (let index = 0; index < this.weights.length; index++) {
      let element = this.weights.at(index);
      if (event) {
        element.clearValidators();
        element.setValidators([Validators.min(0), Validators.max(100)]);
      } else {
        element.setValidators([Validators.required, Validators.compose([Validators.min(0), Validators.max(100)])]);
      }
      element.updateValueAndValidity();
    }
    this.weights.updateValueAndValidity();
  }

  print(): void {
    console.info('Here');
    console.info(this.weights.errors);
    console.info(this.weights.valid);
  }

  get attributes(): FormArray {
    return this.query?.get('attributes') as FormArray;
  }

  get weights(): FormArray {
    return this.query?.get('weights') as FormArray;
  }
  get isWeightStepComplete(): boolean {
    return !this.allowEmptyInput && this.query.get('weights').errors?.emptyWeights;
  }
}

export function hasEmpty(array: FormArray): boolean {
  let result = false;
    for (let index = 0; index < array.value.length; index++) {
      if (!array.value[index]) result = true;
    }
    return result;
}
export function emptyWeights(): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    /* let isComplete = true;
    for (let index = 0; index < control.value.length; index++) {
      if (!control.value[index]) isComplete = false;
    } */
    return hasEmpty(control as FormArray) ? {emptyWeights: {value: control.value}} : null;
  };
}

export function validWeightTotal(allowEmpty: boolean): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} | null => {
    let total = 0;
    for (let index = 0; index < control.value.length; index++) {
      if (control.value[index]) total += control.value[index];
    }
    let empty = hasEmpty(control as FormArray);
    if (!allowEmpty && total == 100) {
      //If empty inputs are not allowed then total weight must always equal 100
      return null;
    } else if (allowEmpty && total <= 100) {
      //If empty inputs are allowed and there are empty inputs present then total weight must be less than 100, to allow for the distrubtion of remaining weight
      if (empty && total == 100) {
        //If there are empty inputs but the total is already equal to 100, then input is invalid
        return {distributeWeight: {value: control.value}};
      } else if (!empty && total != 100) {
        //If there aren't empty inputs, then total weight must still equal 100
        return {validWeightTotal: {value: control.value}};
      }
      return null;
    } else {
      return {validWeightTotal: {value: control.value}};
    }
  };
}