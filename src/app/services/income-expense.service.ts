import { Injectable } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { IncomeExpenses } from '../models/income-expenses.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class IncomeExpenseService {
  constructor(
    private firestore: AngularFirestore,
    private _authService: AuthService
  ) {}

  createdIncomeExpense(incomeExpense: IncomeExpenses) {
    const uid = this._authService.user.uid;
    return this.firestore
      .doc(`${uid}/income-expense`)
      .collection('items')
      .add({ ...incomeExpense });
  }

  initIncomeExpensesListener(uid: string) {
    this.firestore
      .collection(`${uid}/income-expense/items`)
      .valueChanges()
      .subscribe((pepe) => console.log(pepe));
  }
}
