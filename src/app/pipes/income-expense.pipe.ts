import { Pipe, PipeTransform } from '@angular/core';
import { IncomeExpenses } from '../models/income-expenses.model';

@Pipe({
  name: 'incomeExpensePipe',
})
export class IncomeExpensePipe implements PipeTransform {
  transform(items: IncomeExpenses[]): IncomeExpenses[] {
    return items.slice().sort((a, b) => {
      if (a.type === 'income') {
        return -1;
      } else {
        return 1;
      }
    });
  }
}
