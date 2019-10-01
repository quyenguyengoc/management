import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { DateCell } from '../../class/calendar/date-cell';
import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-date-detail',
  templateUrl: './date-detail.component.html'
})
export class DateDetailComponent implements OnInit {

  @Input() selected_date: DateCell;
  @Input() selected_event: EventDate;

  @Output() on_select_event: EventEmitter<EventDate> = new EventEmitter();
  @Output() on_toggle_memo: EventEmitter<{ index: number, action: string }> = new EventEmitter();
  @Output() on_save_date = new EventEmitter();
  @Output() on_delete_event: EventEmitter<any> = new EventEmitter();

  constructor() { }

  select_event(event: EventDate) {
    this.on_select_event.emit(event);
  }

  toggle_memo(event: { index: number, action: string }) {
    this.on_toggle_memo.emit(event);
  }

  save_date() {
    this.on_save_date.emit();
  }

  delete_event(event: any) {
    this.on_delete_event.emit(event)
  }

  ngOnInit() {}

}
