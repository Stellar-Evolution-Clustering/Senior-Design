import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import {
  ClusterType,
  Database,
  DataProcessors,
  IClusterRequest,
} from 'src/app/api/models/cluster-request.model';
import { Attribute } from '../../api/models/attribute.model';
import { QueryService } from '../../api/query.service';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  request: IClusterRequest;
  allowEmptyInput: boolean = false;

  public query: FormGroup = this.fb.group({
    dbSelect: [null, Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array(
      [],
      [emptyWeights(), validWeightTotal(this.allowEmptyInput)]
    ),
    //distFunct: ['', Validators.required],
    algorithm: [null, Validators.required],
    n_clusters: [null, [Validators.required, Validators.min(0)]],
    n_samples: [null, [Validators.required, Validators.min(0)]],
    eps: [null, [Validators.required, Validators.min(0)]],
    standardizer: [DataProcessors.Standard],
    temporal_val: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private router: Router,
    private snack: MatSnackBar
  ) {}

  ngOnInit() {}

  buildRequestTemplate(): IClusterRequest {
    let empty = {};
    if (this.allowEmptyInput && hasEmpty(this.weights)) {
      empty = this.distributeWeights(); //distribute the remaining weight if empty input is allowed and there are empty inputs
    }
    var attributes = {};
    for (let index = 0; index < this.attributes.length; index++) {
      let at = this.attributes.controls[index].value.database_name;
      if (empty[at]) {
        this.weights.controls[index].setValue(empty[at]);
        this.weights.controls[index].updateValueAndValidity(); //update the actual form control value
      }
      attributes[at] = this.weights.controls[index].value / 100;
    }
    this.request = <IClusterRequest>{
      cluster_type: this.query.get('algorithm').value as ClusterType,
      n_clusters: this.query.get('n_clusters').value,
      eps: this.query.get('eps').value,
      n_samples: this.query.get('n_samples').value,
      standardizer: this.query.get('standardizer').value as DataProcessors,
      time_steps: 3,
      attributes: attributes,
      database: this.query.get('dbSelect').value as Database,
      temporal_val: this.query.get('temporal_val').value,
    };
    return this.request;
  }

  buildAttributeDisplayArr(): any[] {
    //used to pass display names and weights to the query summary

    var attributes: any[] = [];

    for (let index = 0; index < this.attributes.length; index++) {
      let at = this.attributes.controls[index].value.database_name;
      let cur = {
        name: this.attributes.controls[index].value?.display_name,
        weight: this.request?.attributes[at],
      };
      attributes.push(cur);
    }
    return attributes;
  }

  distributeWeights(): any {
    let total = 0;
    let empty = {};
    let count = 0;
    for (let index = 0; index < this.weights.value.length; index++) {
      if (this.weights.value[index]) {
        total += this.weights.value[index];
      } else {
        empty[this.attributes.controls[index].value.database_name] = 0;
        count++;
      }
    }
    if (total < 100) {
      let remaining = 100 - total;
      for (const key in empty) {
        empty[key] = remaining / count;
      }
    }
    return empty;
  }

  onSubmit() {
    const queryParams = this.queryService.toQueryPararms(
      this.buildRequestTemplate()
    );
    this.router.navigate(['/query/graph'], { queryParams: queryParams });
  }

  addAttribute(attribute: Attribute): void {
    this.attributes.push(this.fb.control(attribute)); //push the attribute to the attribute array

    if (this.allowEmptyInput) {
      this.weights.push(
        this.fb.control(null, [Validators.min(0), Validators.max(100)])
      );
    } else {
      this.weights.push(
        this.fb.control(null, [
          Validators.required,
          Validators.compose([Validators.min(0), Validators.max(100)]),
        ])
      );
    }
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
    const action = 'Dismiss';
    let msg = '';
    if (this.weights.errors?.distributeWeight) {
      msg =
        'Could not assign empty inputs a value!! Current input already equals 100.';
    } else if (this.weights.errors?.validWeightTotal) {
      msg = 'All weights values must add up to 100!!';
    } else {
      return;
    }

    this.snack.open(msg, action, {
      duration: 3000,
    });
  }

  changeInputMode(event: boolean) {
    this.allowEmptyInput = event;
    if (event) {
      this.weights.clearValidators();
      this.weights.setValidators(validWeightTotal(this.allowEmptyInput));
    } else {
      this.weights.setValidators([
        emptyWeights(),
        validWeightTotal(this.allowEmptyInput),
      ]);
    }
    for (let index = 0; index < this.weights.length; index++) {
      let element = this.weights.at(index);
      if (event) {
        element.clearValidators();
        element.setValidators([Validators.min(0), Validators.max(100)]);
      } else {
        element.setValidators([
          Validators.required,
          Validators.compose([Validators.min(0), Validators.max(100)]),
        ]);
      }
      element.updateValueAndValidity();
    }
    this.weights.updateValueAndValidity();
  }

  print(): void {
    /* console.info('Query Form Data:');
    console.info(this.query.value);
    console.info('Status: ' + this.query.status); */
    console.info('Request Info: ');
    console.info(this.request);
  }

  get attributes(): FormArray {
    return this.query?.get('attributes') as FormArray;
  }

  get weights(): FormArray {
    return this.query?.get('weights') as FormArray;
  }
  get isWeightStepComplete(): boolean {
    return (
      !this.allowEmptyInput && this.query.get('weights').errors?.emptyWeights
    );
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
  return (control: AbstractControl): { [key: string]: any } | null => {
    /* let isComplete = true;
    for (let index = 0; index < control.value.length; index++) {
      if (!control.value[index]) isComplete = false;
    } */
    return hasEmpty(control as FormArray)
      ? { emptyWeights: { value: control.value } }
      : null;
  };
}

export function validWeightTotal(allowEmpty: boolean): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
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
        return { distributeWeight: { value: control.value } };
      } else if (!empty && total != 100) {
        //If there aren't empty inputs, then total weight must still equal 100
        return { validWeightTotal: { value: control.value } };
      }
      return null;
    } else {
      return { validWeightTotal: { value: control.value } };
    }
  };
}
