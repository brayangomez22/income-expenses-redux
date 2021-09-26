import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

import { StoreModule } from '@ngrx/store';
import { incomeExpenseReducer } from './income-expenses.reducer';

import { DashboardRoutingModule } from '../dashboard/dashboard-routing.module';

import { DashboardComponent } from '../dashboard/dashboard.component';
import { IncomeExpensesComponent } from './income-expenses.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { DetailComponent } from './detail/detail.component';

import { IncomeExpensePipe } from '../pipes/income-expense.pipe';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    DashboardComponent,
    IncomeExpensesComponent,
    StatisticsComponent,
    DetailComponent,
    IncomeExpensePipe,
  ],
  imports: [
    CommonModule,
    StoreModule.forFeature('incomeExpenses', incomeExpenseReducer),
    ReactiveFormsModule,
    ChartsModule,
    SharedModule,
    DashboardRoutingModule,
  ],
})
export class IncomeExpensesModule {}
