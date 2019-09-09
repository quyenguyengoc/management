import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EVENTTYPES } from '../../shared/event-types';

import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  EVENTTYPES = EVENTTYPES;

  @Input() currentEvent: EventDate;

  @Output() onToggleMemo: EventEmitter<{ index: number, action: string }> = new EventEmitter();

  @Output() onSaveEvent = new EventEmitter();

  toggleMemo(index, action) {
    this.onToggleMemo.emit({ index: index, action: action });
  }

  updateMemoPrice(memo) {
    let price = 0;
    this.currentEvent.memo.forEach(function(memo) {
      price += memo.isDestroy ? 0 : memo.price*1;
    });
    if (price > 0) { this.currentEvent.price = price };
  }

  saveEvent() {
    this.onSaveEvent.emit();
  }

  constructor() { }

  ngOnInit() {}
}
