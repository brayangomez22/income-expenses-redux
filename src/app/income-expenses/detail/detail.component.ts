import { Component, OnInit, OnDestroy } from '@angular/core';

import Swal from 'sweetalert2';

import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppStateWithIncome } from '../income-expenses.reducer';

import { IncomeExpenses } from '../../models/income-expenses.model';
import { IncomeExpenseService } from '../../services/income-expense.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styles: [],
})
export class DetailComponent implements OnInit, OnDestroy {
  incomeExpenses: IncomeExpenses[] = [];
  incomeExpensesSubs!: Subscription;

  constructor(
    private store: Store<AppStateWithIncome>,
    private _incomeExpensesService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.incomeExpensesSubs = this.store
      .select('incomeExpenses')
      .subscribe(({ items }) => (this.incomeExpenses = items));
  }

  ngOnDestroy(): void {
    this.incomeExpensesSubs.unsubscribe();
  }

  delete(uid: string) {
    this._incomeExpensesService
      .deleteIncomeExpense(uid)
      .then(() =>
        Swal.fire('Item deleted successfully', 'Item was removed', 'success')
      )
      .catch((err) => Swal.fire('Error', err.message, 'error'));
  }
}
