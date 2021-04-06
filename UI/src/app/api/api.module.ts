import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QueryService } from './query.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  providers: [QueryService],
})
export class ApiModule {}
