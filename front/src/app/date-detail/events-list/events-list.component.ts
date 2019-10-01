import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { HEADERS } from '../date-detail-header';

import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {

  HEADERS: object = HEADERS;

  @Input() source: any;

  @Output() on_select_event: EventEmitter<EventDate> = new EventEmitter();
  @Output() on_delete_event: EventEmitter<any> = new EventEmitter();


  select_event(event: any) {
    this.on_select_event.emit(event.data);
  }

  delete_event(event: any) {
    this.on_delete_event.emit(event);
  }

  constructor() {
  }

  ngOnInit() {}
}
