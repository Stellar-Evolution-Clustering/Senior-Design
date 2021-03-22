import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VariablesService } from './variables.service';
import { ClusteringService } from './clustering.service';
import { DatabaseService } from './database.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [VariablesService, ClusteringService, DatabaseService],
})
export class ApiModule {}
