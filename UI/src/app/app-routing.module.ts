import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { GraphComponent } from './graph/graph.component';
import { DBComponent } from './db/db.component';
import { AttributeComponent } from './attribute/attribute.component';
import { WeightComponent } from './weight/weight.component';
import { DistanceFuncComponent } from './distance-func/distance-func.component';
import { ClusterMethodComponent } from './cluster-method/cluster-method.component';
import { HelpComponent } from './help/help.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  { path: 'home', component: QueryComponent },
  { path: 'db', component: DBComponent },
  { path: 'attribute', component: AttributeComponent },
  { path: 'weight', component: WeightComponent },
  { path: 'distanceFunc', component: DistanceFuncComponent },
  { path: 'clusterMethod', component: ClusterMethodComponent },
  { path: 'graph', component: GraphComponent },
  { path: 'help', component: HelpComponent },
  { path: 'about', component: AboutComponent },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
