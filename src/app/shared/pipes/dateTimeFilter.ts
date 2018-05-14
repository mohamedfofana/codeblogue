import { Pipe, PipeTransform } from '@angular/core';

import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateTimeFilter'
})

export class DateTimeFilterPipe extends DatePipe implements PipeTransform {
  transform(aDate: Date, args?: any): string {
    return super.transform(aDate, 'dd/MM/yyyy HH:MM:ss');
  }
}