import { Component, OnInit } from '@angular/core';

import { Subscription } from 'rxjs';

import { MultiDataSet, Label } from 'ng2-charts';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { IncomeExpenses } from '../../models/income-expenses.model';

@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styles: [],
})
export class StatisticsComponent implements OnInit {
  income: number = 0;
  expenses: number = 0;

  totalIncome: number = 0;
  totalExpenses: number = 0;

  statisticsSubs!: Subscription;

  // Doughnut
  public doughnutChartLabels: Label[] = ['Income', 'Expenses'];
  public doughnutChartData: MultiDataSet = [[]];

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store
      .select('incomeExpenses')
      .subscribe(({ items }) => this.generateStatistics(items));
  }

  generateStatistics(items: IncomeExpenses[]) {
    for (const item of items) {
      if (item.type === 'income') {
        this.totalIncome += item.monto;
        this.income++;
      } else {
        this.totalExpenses += item.monto;
        this.expenses++;
      }
    }

    this.doughnutChartData = [[this.totalIncome, this.totalExpenses]];
  }
}
