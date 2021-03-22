import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttributeComponent } from './attribute/attribute.component';
import { ClusterMethodComponent } from './cluster-method/cluster-method.component';
import { DBComponent } from './db/db.component';
import { DistanceFuncComponent } from './distance-func/distance-func.component';
import { GraphComponent } from './graph/graph.component';
import { QueryComponent } from './query.component';
import { StepperComponent } from './stepper/stepper.component';
import { WeightComponent } from './weight/weight.component';

const queryRoutes: Routes = [
  { path: 'db', component: DBComponent },
  { path: 'attribute', component: AttributeComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'distanceFunc', component: DistanceFuncComponent },
  { path: 'clusterMethod', component: ClusterMethodComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'step', component: StepperComponent },
];

@NgModule({
  imports: [RouterModule.forChild(queryRoutes)],
  exports: [RouterModule],
})
export class QueryRoutingModule {}
