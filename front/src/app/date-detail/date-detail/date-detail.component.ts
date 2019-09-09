import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DateCell } from '../../class/calendar/date-cell';
import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html'
})
export class DateDetailComponent implements OnInit {

  @Input() modalData: {
    currentEvent: EventDate;
    selectedDate: DateCell;
  };

  @Output() onSelectEvent: EventEmitter<EventDate> = new EventEmitter();

  @Output() onToggleMemo: EventEmitter<{ index: number, action: string}> = new EventEmitter();

  constructor() { }

  selectEvent(event) {
    this.onSelectEvent.emit(event);
  }

  toggleMemo(event) {
    this.onToggleMemo.emit(event);
  }

  ngOnInit() {}

}
