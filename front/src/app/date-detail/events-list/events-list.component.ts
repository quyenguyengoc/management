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

  @Output() onSelectEvent: EventEmitter<EventDate> = new EventEmitter();
  @Output() onDeleteEvent: EventEmitter<any> = new EventEmitter();


  selectEvent(event: any) {
    this.onSelectEvent.emit(event.data);
  }

  deleteEvent(event: any) {
    this.onDeleteEvent.emit(event);
  }

  constructor() {
  }

  ngOnInit() {}
}
