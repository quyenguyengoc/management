import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DateCell } from '../../class/calendar/date-cell';
import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html'
})
export class DateDetailComponent implements OnInit {

  @Input() selectedDate: DateCell;
  @Input() selectedEvent: EventDate;

  @Output() onSelectEvent: EventEmitter<EventDate> = new EventEmitter();
  @Output() onToggleMemo: EventEmitter<{ index: number, action: string }> = new EventEmitter();
  @Output() onSaveDate = new EventEmitter();
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter();

  constructor() { }

  selectEvent(event: EventDate) {
    this.onSelectEvent.emit(event);
  }

  toggleMemo(event: { index: number, action: string }) {
    this.onToggleMemo.emit(event);
  }

  saveDate() {
    this.onSaveDate.emit();
  }

  deleteEvent(event: any) {
    this.onDeleteEvent.emit(event)
  }

  ngOnInit() {}

}
