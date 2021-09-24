import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { Store } from '@ngrx/store';
import { AppState } from '../app.reducer';
import * as ui from '../shared/ui.actions';

import { IncomeExpenseService } from '../services/income-expense.service';
import { IncomeExpenses } from '../models/income-expenses.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [],
})
export class IncomeExpensesComponent implements OnInit, OnDestroy {
  incomeForm!: FormGroup;
  type: string = 'income';
  loading: boolean = false;
  incomeSubscription!: Subscription;

  constructor(
    private fb: FormBuilder,
    private _incomeExpenseService: IncomeExpenseService,
    private store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this.incomeSubscription = this.store
      .select('ui')
      .subscribe((ui) => (this.loading = ui.isLoading));

    this.createForm();
  }

  ngOnDestroy(): void {
    this.incomeSubscription.unsubscribe();
  }

  createForm() {
    this.incomeForm = this.fb.group({
      description: ['', Validators.required],
      monto: ['', Validators.required],
    });
  }

  save() {
    if (this.incomeForm.invalid) {
      return;
    }

    this.store.dispatch(ui.isLoading());

    const { description, monto } = this.incomeForm.value;
    const incomeExpense = new IncomeExpenses(description, monto, this.type);

    this._incomeExpenseService
      .createdIncomeExpense(incomeExpense)
      .then(() => {
        this.incomeForm.reset();
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Successfully created record', description, 'success');
      })
      .catch((err) => {
        this.store.dispatch(ui.stopLoading());
        Swal.fire('Error', err.message, 'error');
      });
  }
}
