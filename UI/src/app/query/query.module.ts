import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AttributeComponent } from './attribute/attribute.component';
import { ClusterMethodComponent } from './cluster-method/cluster-method.component';
import { DBComponent } from './db/db.component';
import { DistanceFuncComponent } from './distance-func/distance-func.component';
import { GraphComponent } from './graph/graph.component';
import { WeightComponent } from './weight/weight.component';
import { MaterialModule } from '../material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js/dist/plotly.js';
import { StepperComponent } from './stepper/stepper.component';
import { QueryRoutingModule } from './query-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ApiModule } from '../api/api.module';
import { QuerySummaryComponent } from './stepper/query-summary/query-summary.component';
import { ClusterparamsComponent } from './clusterparams/clusterparams.component';

PlotlyModule.plotlyjs = Plotly;

@NgModule({
  declarations: [
    GraphComponent,
    DBComponent,
    AttributeComponent,
    StepperComponent,
    WeightComponent,
    DistanceFuncComponent,
    ClusterMethodComponent,
    QuerySummaryComponent,
    ClusterparamsComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    QueryRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    PlotlyModule,
  ],
})
export class QueryModule {}
