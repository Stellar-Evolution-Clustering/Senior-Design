import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
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

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnInit {
  attributes: Observable<Attribute[]>;

  query = this.fb.group({
    dbSelect: ['', Validators.required],
    attributes: this.fb.array([], Validators.required),
    weights: this.fb.array([]), //replace with custom validator to check that weights are valid values? (i.e. no out of bounds values and ensureing that all weights add up to 1.00?)
    distFunct: ['', Validators.required],
    algorithm: ['', Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private queryService: QueryService,
    private router: Router
  ) {}

  ngOnInit() {
    this.attributes = this.queryService.getAttributes();
  }

  buildRequestTemplate(): IClusterRequest {
    var attributes = {};
    for (let index = 0; index < this.attr.length; index++) {
      attributes[
        this.attr.controls[index].value.database_name
      ] = this.weigh.controls[index].value;
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

  onSubmit() {
    console.log('WHAT');
    const queryParams = toQueryPararms(this.buildRequestTemplate());
    console.log(queryParams);
    this.router.navigate(['/query/graph'], { queryParams: queryParams });
  }

  addAttribute(attribute: Attribute): void {
    this.attr.push(this.fb.control(attribute)); //push the attribute to the attribute array
    this.weigh.push(this.fb.control('', Validators.required));
  }

  deleteAttribute(attribute: Attribute): void {
    for (let index = 0; index < this.attr.length; index++) {
      if (this.attr.controls[index].value == attribute) {
        this.attr.removeAt(index);
        this.weigh.removeAt(index);
        break;
      }
    }
  }

  print(): void {
    console.info('Here');
    console.info(this.query.value);
  }

  get attr(): FormArray {
    return this.query.get('attributes') as FormArray;
  }

  get weigh(): FormArray {
    return this.query.get('weights') as FormArray;
  }
}
