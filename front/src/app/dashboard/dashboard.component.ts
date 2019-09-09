import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  modalData: {
    currentEvent: EventDate;
    selectedDate: DateCell;
  };

  cloneModalData: {
    currentEvent: EventDate;
    selectedDate: DateCell;
  }

  constructor(private router: Router, private modal: NgbModal) { }

  dateDetail(dateCell) {
    let selectedDate = dateCell || new DateCell({  date: new Date() });
    this.modalData = { selectedDate: selectedDate, currentEvent: new EventDate() };
    this.cloneModalData = Object.assign({}, this.modalData)
    this.modal.open(this.modalContent, { size: 'lg', keyboard: false, backdrop: 'static' });
  }

  selectEvent(event) {
    this.cloneModalData.currentEvent = event;
  }

  toggleMemo(event) {
    switch(event.action) {
      case 'add':
        this.cloneModalData.currentEvent.addNewMemo();
        break;
      case 'remove':
        this.cloneModalData.currentEvent.memo[event.index].isDestroy = true;
        this.cloneModalData.currentEvent.price += this.cloneModalData.currentEvent.memo[event.index].price * -1;
        break;
      case 'undo':
        this.cloneModalData.currentEvent.memo[event.index].isDestroy = false;
        this.cloneModalData.currentEvent.price += this.cloneModalData.currentEvent.memo[event.index].price * 1;
        break;
    };
  }

  saveEvent() {
    if (!!!this.modalData.currentEvent.id) {
      this.cloneModalData.selectedDate.events.push(this.modalData.currentEvent);
    } else {
      Object.assign(this.cloneModalData.selectedDate.events.find(event => event.id === this.cloneModalData.currentEvent.id));
    }
  }

  ngOnInit() {}
}
