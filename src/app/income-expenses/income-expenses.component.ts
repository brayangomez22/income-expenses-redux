import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

import { IncomeExpenseService } from '../services/income-expense.service';
import { IncomeExpenses } from '../models/income-expenses.model';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [],
})
export class IncomeExpensesComponent implements OnInit {
  incomeForm!: FormGroup;
  type: string = 'income';

  constructor(
    private fb: FormBuilder,
    private _incomeExpenseService: IncomeExpenseService
  ) {}

  ngOnInit(): void {
    this.createForm();
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

    const { description, monto } = this.incomeForm.value;
    const incomeExpense = new IncomeExpenses(description, monto, this.type);

    this._incomeExpenseService
      .createdIncomeExpense(incomeExpense)
      .then(() => {
        this.incomeForm.reset();
        Swal.fire('Successfully created record', description, 'success');
      })
      .catch((err) => Swal.fire('Error', err.message, 'error'));
  }
}
