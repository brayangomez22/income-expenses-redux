import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
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

  constructor(
    private store: Store<AppState>,
    private _incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.userSubs = this.store
      .select('user')
      .pipe(filter((auth) => auth.user != null))
      .subscribe(({ user }) => {
        this._incomeExpenseService.initIncomeExpensesListener(user?.uid);
      });
  }

  ngOnDestroy(): void {
    this.userSubs.unsubscribe();
  }
}
