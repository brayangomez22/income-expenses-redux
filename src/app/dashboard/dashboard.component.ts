import { Component, OnInit, OnDestroy } from '@angular/core';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as incomeExpensesActions from '../income-expenses/income-expenses.actions';

import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { IncomeExpenseService } from '../services/income-expense.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: [],
})
export class DashboardComponent implements OnInit, OnDestroy {
  userSubs!: Subscription;
  incomeExpenseSubs!: Subscription;

  constructor(
    private store: Store<AppState>,
    private _incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this.incomeExpenseSubs = this._incomeExpenseService
          .initIncomeExpensesListener(user?.uid)
          .subscribe((incomeExpenses) =>
            this.store.dispatch(
              incomeExpensesActions.setItems({ items: incomeExpenses })
            )
          );
      });
  }

  ngOnDestroy(): void {
    if (this.incomeExpenseSubs) {
      this.incomeExpenseSubs.unsubscribe();
    }
    if (this.userSubs) {
      this.userSubs.unsubscribe();
    }
  }
}
