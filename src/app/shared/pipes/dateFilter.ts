import { Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFilter'
})

export class DateFilterPipe extends DatePipe implements PipeTransform {
  transform(aDate: Date, args?: any): string {
    return super.transform(aDate, 'dd/MM/yyyy');
  }
}