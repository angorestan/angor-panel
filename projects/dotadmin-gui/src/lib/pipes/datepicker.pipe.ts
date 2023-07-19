import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { map, tap } from 'rxjs';
import * as moment from 'jalali-moment';

@Pipe({
  name: 'datepicker',
})
export class DatepickerPipe implements PipeTransform {
  transform(value: FormGroup, field: string) {
    return value.valueChanges.pipe(
      map((_) => {
        const control: AbstractControl | null = value.get(field);
        if (!control) return '';
        if (!control.value) return '';
        const _value: number = control.value;
        const _string = moment.unix(_value).format('jYYYY/jMM/jDD');
        console.log(_string);

        return _string;
      })
    );
  }
}
