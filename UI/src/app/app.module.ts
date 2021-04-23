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
import { ApiModule } from './api/api.module';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';
import { HomeComponent } from './home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfigureGraphComponent } from './query/graph/configure-graph/configure-graph.component';
import { QueryModule } from './query/query.module';

PlotlyModule.plotlyjs = Plotly;

@NgModule({
  declarations: [
    AppComponent,
    HelpComponent,
    AboutComponent,
    HomeComponent,
    ConfigureGraphComponent,
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
    ApiModule,
    QueryModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
