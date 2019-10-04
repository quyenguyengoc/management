import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { EVENTTYPES } from '../../shared/event-types';

import { PAYERIDS } from '../../shared/payer-ids';

import { EventDate } from '../../class/calendar/event-date';
import { FormatService } from 'src/app/services/common/format.service';

@Component({
  selector: 'app-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit {

  EVENTTYPES = EVENTTYPES;

  PAYERIDS = PAYERIDS;

  @Input() current_event: EventDate;

  @Output() on_toggle_memo: EventEmitter<{ index: number, action: string }> = new EventEmitter();

  @Output() on_save_date = new EventEmitter();

  toggle_memo(index: number, action: string) {
    this.on_toggle_memo.emit({ index: index, action: action });
  }

  updateMemoPrice() {
    let price = 0;
    this.current_event.memo.forEach(function(memo) {
      price += memo.is_destroy ? 0 : memo.price*1;
    });
    this.current_event.price = price
  }

  save_date() {
    this.on_save_date.emit();
  }

  to_vnd(value: number) {
    return this.format.to_vnd(value);
  }

  constructor(private format: FormatService) { }

  ngOnInit() {}
}
