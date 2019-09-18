import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

import { DateCellsService } from '../services/date-cells.service';

import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';
// import { EventMemo } from '../class/calendar/event-memo';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;

  calendarData = { visibleRange: { }, data: [] };

  modalData: {
    currentEvent: EventDate;
    selectedDate: DateCell;
  };

  cloneModalData: {
    currentEvent: EventDate;
    selectedDate: DateCell;
  }

  constructor(private modal: NgbModal, private route: ActivatedRoute, private dateCellsService: DateCellsService) { }

  dateDetail(dateCell: DateCell) {
    let selectedDate = dateCell || new DateCell({  date: new Date() });
    this.dateCellsService.getEvents(selectedDate.id)
      .subscribe(response => {
        this.modalData = {
          selectedDate: new DateCell({
            id: response.date_cell.id,
            date: response.date_cell.date,
            eatingCost: response.date_cell.eating_cost,
            otherCost: response.date_cell.other_cost,
            events: new LocalDataSource(response.date_cell.events.map((event: any) => {
              return new EventDate({
                id: event.id,
                title: event.title,
                price: event.price,
                type: event.cost_type === 'eating' ? '0' : '1',
                memo: event.memo.map((memo: any) => {
                  return new EventMemo({
                    id: memo.id,
                    content: memo.content,
                    price: memo.price,
                    payerID: memo.payer_id
                  })
                })
              })
            }))
          }),
          currentEvent: new EventDate()
        }
        this.cloneModalData = Object.assign({}, this.modalData);
        console.log(this.cloneModalData);
        this.modal.open(this.modalContent, { size: 'lg', keyboard: false, backdrop: 'static' });
      });
  }

  selectEvent(event: EventDate) {
    this.cloneModalData.currentEvent = event;
  }

  toggleMemo(event: {action: string, index: number}) {
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

  ngOnInit() {
    this.route.data
      .map((data) => data['response'])
      .subscribe(
        (response) => {
          this.calendarData.visibleRange = response.visible_range;
          this.calendarData.data = response.dates.map((date) => {
            return new DateCell({
              id: date.id,
              date: date.date,
              eatingCost: date.eating_cost,
              otherCost: date.other_cost,
              events: new LocalDataSource([])
            })
          });
        }
      )
  }
}
