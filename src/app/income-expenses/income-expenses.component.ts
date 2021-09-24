import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-income-expenses',
  templateUrl: './income-expenses.component.html',
  styles: [],
})
export class IncomeExpensesComponent implements OnInit {
  incomeForm!: FormGroup;
  type: string = 'income';

  constructor(private fb: FormBuilder) {}

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
  }
}
