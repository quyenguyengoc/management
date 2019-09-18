import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EVENTTYPES } from '../../shared/event-types';

import { PAYERIDS } from '../../shared/payer-ids';

import { EventDate } from '../../class/calendar/event-date';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  EVENTTYPES = EVENTTYPES;

  PAYERIDS = PAYERIDS;

  @Input() currentEvent: EventDate;

  @Output() onToggleMemo: EventEmitter<{ index: number, action: string }> = new EventEmitter();

  @Output() onSaveEvent = new EventEmitter();

  toggleMemo(index: number, action: string) {
    this.onToggleMemo.emit({ index: index, action: action });
  }

  updateMemoPrice() {
    let price = 0;
    this.currentEvent.memo.forEach(function(memo) {
      price += memo.isDestroy ? 0 : memo.price*1;
    });
    this.currentEvent.price = price
  }

  saveEvent() {
    this.onSaveEvent.emit();
  }

  constructor() { }

  ngOnInit() {}
}
