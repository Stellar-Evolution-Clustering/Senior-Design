import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'query', component: QueryComponent, children: [
    { path: 'db', component: DBComponent },
    { path: 'attribute', component: AttributeComponent },
    { path: 'weight', component: WeightComponent },
    { path: 'distanceFunc', component: DistanceFuncComponent },
    { path: 'clusterMethod', component: ClusterMethodComponent },
    { path: 'graph', component: GraphComponent },
    { path: 'step', component: StepperComponent },
  ]},
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
