import { Component, OnInit, OnDestroy } from '@angular/core';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import { IncomeExpenses } from '../../models/income-expenses.model';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpensesSubs!: Subscription;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe(({ items }) => (this.incomeExpenses = items));
  }

  ngOnDestroy(): void {
    this.incomeExpensesSubs.unsubscribe();
  }

  delete(uid: string) {
    console.log(uid);
  }
}
