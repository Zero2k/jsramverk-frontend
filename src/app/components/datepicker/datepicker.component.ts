import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';
import * as _ from 'lodash';

export interface CalendarDate {
  mDate: moment.Moment;
  today?: boolean;
}

@Component({
  selector: 'datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.scss'],
  host: {
    '(document:click)': 'onCloseCalendar($event)'
  }
})
export class DatepickerComponent implements OnInit {
  currentDate = moment();
  dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  weeks: CalendarDate[][] = [];

  showCalendar: boolean = false;
  result: any;

  onShowCalendar(e: Event): void {
    e.stopPropagation();
    this.showCalendar = true;
  }

  onCloseCalendar(e?: Event): void {
    if (this.showCalendar) {
      this.showCalendar = false;
      this.update.emit(this.result);
    }
    return;
  }

  isToday(date: moment.Moment): boolean {
    return moment().isSame(moment(date), 'day');
  }

  isSelected(date: moment.Moment): boolean {
    return moment(date).isSame(this.result, 'day');
  }

  isSelectedMonth(date: moment.Moment): boolean {
    return moment(date).isSame(this.currentDate, 'month');
  }

  selectDate(e: Event, date: CalendarDate): void {
    e.stopPropagation();
    this.result = date.mDate.format('YYYY-MM-DD');
    this.update.emit(this.result);
    this.onCloseCalendar();
  }

  // actions from calendar

  prevMonth(e: Event): void {
    e.stopPropagation();
    this.currentDate = moment(this.currentDate).subtract(1, 'months');
    this.generateCalendar();
  }

  nextMonth(e: Event): void {
    e.stopPropagation();
    this.currentDate = moment(this.currentDate).add(1, 'months');
    this.generateCalendar();
  }

  prevYear(e: Event): void {
    e.stopPropagation();
    this.currentDate = moment(this.currentDate).subtract(1, 'year');
    this.generateCalendar();
  }

  nextYear(e: Event): void {
    e.stopPropagation();
    this.currentDate = moment(this.currentDate).add(1, 'year');
    this.generateCalendar();
  }

  // generate the calendar grid

  generateCalendar(): void {
    const dates = this.fillDates(this.currentDate);
    const weeks: CalendarDate[][] = [];
    while (dates.length > 0) {
      weeks.push(dates.splice(0, 7));
    }
    this.weeks = weeks;
  }

  fillDates(currentMoment: moment.Moment): CalendarDate[] {
    const firstOfMonth = moment(currentMoment)
      .startOf('month')
      .day();
    const firstDayOfGrid = moment(currentMoment)
      .startOf('month')
      .subtract(firstOfMonth, 'days');
    const start = firstDayOfGrid.date();
    return _.range(start, start + 42).map(
      (date: number): CalendarDate => {
        const d = moment(firstDayOfGrid).date(date);
        return {
          today: this.isToday(d),
          mDate: d
        };
      }
    );
  }

  ngOnInit() {
    this.generateCalendar();
  }

  @Output() update: EventEmitter<CalendarDate> = new EventEmitter<
    CalendarDate
  >();
}
