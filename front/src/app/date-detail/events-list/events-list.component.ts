import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';

import { HEADERS } from '../date-detail-header';

import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html'
})
export class EventsListComponent implements OnInit {

  events: any = undefined;

  HEADERS: object = HEADERS;

  @Input() source: EventDate[];

  @Output() onSelectEvent: EventEmitter<EventDate> = new EventEmitter();


  selectEvent(event) {
    this.onSelectEvent.emit(event.data);
  }

  constructor() {
  }

  ngOnInit() {
    if (this.source) {
      this.events = new LocalDataSource(this.source.filter( event => event.available ));
    }
  }
}
