import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QueryComponent } from './query/query.component';
import { GraphComponent } from './graph/graph.component';
<<<<<<< HEAD


const routes: Routes = [
  { path: '', component: QueryComponent },
  { path: 'graph', component: GraphComponent },
];
=======

const routes: Routes = [
  { path: '', component: QueryComponent },
  { path: 'graph', component: GraphComponent },
];

>>>>>>> 5f77ace66191063ab624a869f15d973163fe41a4

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
