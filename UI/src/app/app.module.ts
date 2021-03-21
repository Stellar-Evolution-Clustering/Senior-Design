import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';


import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js/dist/plotly.js';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavModule } from './nav/nav.module';
import { QueryComponent } from './query/query.component';
import { ApiModule } from './api/api.module';
import { GraphComponent } from './query/graph/graph.component';
import { DBComponent } from './query/db/db.component';
import { AttributeComponent } from './query/attribute/attribute.component';
import { WeightComponent } from './query/weight/weight.component';
import { DistanceFuncComponent } from './query/distance-func/distance-func.component';
import { ClusterMethodComponent } from './query/cluster-method/cluster-method.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { StepperComponent } from './query/stepper/stepper.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigureGraphComponent } from './query/graph/configure-graph/configure-graph.component';

PlotlyModule.plotlyjs = Plotly;


@NgModule({
  declarations: [
    AppComponent,
    QueryComponent,
    GraphComponent,
    DBComponent,
    AttributeComponent,
    WeightComponent,
    DistanceFuncComponent,
    ClusterMethodComponent,
    HelpComponent,
    AboutComponent,
    HomeComponent,
    StepperComponent,
    ConfigureGraphComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    ApiModule,
    MaterialModule,
    PlotlyModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
