import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import * as moment from 'jalali-moment';

@Component({
  selector: 'dot-datepicker-scroll',
  templateUrl: './datepicker-scroll.component.html',
  styleUrls: ['./datepicker-scroll.component.scss'],
  host: {
    class: 'grid grid-cols-3 gap-1 max-h-[100px] overflow-hidden',
  },
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => DatepickerScrollComponent),
    },
  ],
})
export class DatepickerScrollComponent implements ControlValueAccessor {
  private _onChange = (value: number | null) => undefined;
  private _onTouched = () => undefined;

  writeValue(obj: number | null): void {
    console.log(obj);
  }
  registerOnChange(fn: any): void {
    this._onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this._onTouched = fn;
  }

  @Input()
  public format: 'jalali' | 'gregorian' = 'jalali';

  private calendars: { jalali: Calendar; gregorian: Calendar } = {
    jalali: {
      dir: 'rtl',
      class: '',
      week: ['ش', 'ی', 'د', 'س', 'چ', 'پ', 'ج'],
      month: [
        'فروردین',
        'اردیبهشت',
        'خرداد',
        'تیر',
        'مرداد',
        'شهریور	',
        'مهر',
        'آبان',
        'آذر',
        'دی',
        'بهمن',
        'اسفند',
      ],
    },
    gregorian: {
      dir: 'ltr',
      class: 'text-en',
      week: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      month: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    },
  };

  public get Calendar(): Calendar {
    return this.calendars[this.format];
  }

  public Years: number[] = [];
  public Days: number[] = Array.from({ length: 31 }, (_, i) => i + 1);

  public Value: DateValue = {
    year: 0,
    month: 0,
    monthName: '',
    day: 0,
  };

  ngOnInit() {
    this._setYears();

    this.Value = {
      year: this.Years[0],
      month: 1,
      monthName: this.Calendar.month[0],
      day: 1,
    };
  }

  private _setYears() {
    const currentYear =
      this.format == 'jalali' ? moment().jYear() : moment().year();

    this.Years = Array.from({ length: 100 }, (_, i) => currentYear - i);
  }

  public setDateValue(key: keyof DateValue, index: number) {
    switch (key) {
      case 'year':
        var year = this.Years[index];
        this.Value.year = year;

        break;

      case 'month':
        var monthName: string = this.Calendar.month[index];
        this.Value.month = index + 1;
        this.Value.monthName = monthName;

        break;

      case 'day':
        var day = index + 1;
        this.Value.day = day;

        break;

      default:
        break;
    }

    this._onChange(
      moment(
        `${this.Value.year}/${this.Value.month}/${this.Value.day}`,
        this.format == 'jalali' ? 'jYYYY/jMM/jDD' : 'YYYY/MM/DD'
      ).unix()
    );
  }
}

export interface DateValue {
  year: number;
  month: number;
  monthName: string;
  day: number;
}

interface Calendar {
  dir: 'ltr' | 'rtl';
  class: string;
  week: string[];
  month: string[];
}
