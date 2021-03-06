import { Action, createReducer, on } from '@ngrx/store';
import { setItems, unSetItems } from './income-expenses.actions';
import { IncomeExpenses } from '../models/income-expenses.model';
import { AppState } from '../app.reducer';

export interface State {
  items: IncomeExpenses[];
}

export interface AppStateWithIncome extends AppState {
  incomeExpenses: State;
}

export const initialState: State = {
  items: [],
};

const _incomeExpenseReducer = createReducer(
  initialState,

  on(setItems, (state, { items }) => ({ ...state, items: [...items] })),
  on(unSetItems, (state) => ({ ...state, items: [] }))
);

export function incomeExpenseReducer(state: State | undefined, action: Action) {
  return _incomeExpenseReducer(state, action);
}
