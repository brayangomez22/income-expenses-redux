import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { dashboardRoutes } from './dashboard.routes';
import { AuthGuard } from '../services/auth-guard';

const routesChild: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: dashboardRoutes,
    // canActivate: [AuthGuard],
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routesChild)],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
