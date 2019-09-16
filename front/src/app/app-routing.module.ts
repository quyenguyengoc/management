import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DateCellsResolver } from './services/date-cells.resolver';

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
      dateCells: DateCellsResolver
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
