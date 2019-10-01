import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateCellsResolver } from './resolvers/date-cells.resolver';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: DashboardComponent,
    data: {
      title: 'Dashboard'
    },
    resolve: {
      response: DateCellsResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    DateCellsResolver
  ]
})
export class AppRoutingModule { }
