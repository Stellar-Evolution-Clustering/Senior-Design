import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { NavModule } from './nav/nav.module';
import { QueryComponent } from './query/query.component';
import { ApiModule } from './api/api.module';
import { GraphComponent } from './graph/graph.component';

import { PlotlyModule } from 'angular-plotly.js';
import * as Plotly from 'plotly.js/dist/plotly.js';
PlotlyModule.plotlyjs = Plotly;

@NgModule({
  declarations: [AppComponent, QueryComponent, GraphComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NavModule,
    ApiModule,
    MaterialModule,
    PlotlyModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
