import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

import { DateCellsService } from '../services/date-cells.service';
import { FormatService } from '../services/common/format.service';

import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';
import { CalendarComponent } from '../calendar/calendar.component';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent') modalContent: TemplateRef<any>;
  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  calendarData = { visibleRange: { }, data: [] };

  selectedDate: DateCell;
  selectedEvent: EventDate;

  constructor(private modal: NgbModal, private route: ActivatedRoute, private dateCellsService: DateCellsService, private format: FormatService) { }

  dateDetail(dateCell: DateCell) {
    if (!!!dateCell) {
      dateCell = this.calendarData.data.find(date => {
        return date.date == this.format.date();
      })
    }

    this.dateCellsService.getEvents(dateCell.id)
      .subscribe(response => {
        dateCell.loadEvents(response.date_cell.events);
        this.selectedDate = dateCell;
        this.selectedEvent = new EventDate();
        this.modal.open(this.modalContent, { size: 'lg', keyboard: false, backdrop: 'static' });
      });
  }

  selectEvent(event: EventDate) {
    this.selectedEvent = event;
  }

  toggleMemo(event: {action: string, index: number}) {
    switch(event.action) {
      case 'add':
        this.selectedEvent.addNewMemo();
        break;
      case 'remove':
        this.selectedEvent.memo[event.index].isDestroy = true;
        this.selectedEvent.price += this.selectedEvent.memo[event.index].price * -1;
        break;
      case 'undo':
        this.selectedEvent.memo[event.index].isDestroy = false;
        this.selectedEvent.price += this.selectedEvent.memo[event.index].price * 1;
        break;
    };
  }

  saveDate() {
    let date_cell = {
      date_cell: this.selectedDate.date
    };
    if (this.selectedEvent.newObject() && !!!this.selectedEvent.emptyMemo()) {
      this.selectedDate.events.add(this.selectedEvent);
    }
    this.selectedDate.getEvents().then(events => {
      date_cell['events_attributes'] = events.map((event: EventDate) => {
        return event.eventObj();
      });
      this.dateCellsService.saveDate(this.selectedDate.id, date_cell)
        .subscribe(response => {
          this.selectedEvent.memo = this.selectedEvent.memo.filter(memo => memo.available());
          this.calendarData.data.find((date: DateCell) => {
            return date.id === response.date_cell.id;
          }).updateCost(response.date_cell);
          this.selectedDate.loadEvents(response.date_cell.events);
          if (this.selectedEvent.emptyMemo() || this.selectedEvent.newObject()) {
            this.selectedEvent = new EventDate();
          }
          this.calendar.reload();
        });
    });
  }

  deleteEvent(event: any) {
    event.data.toggleDeleteEvent()
    let row = $(document.querySelectorAll('ng2-smart-table table tbody tr')[event.index]);
    event.data.isDestroy ? row.addClass('table-danger') : row.removeClass('table-danger');
  }

  ngOnInit() {
    this.route.data
      .map((data) => data['response'])
      .subscribe(
        (response) => {
          this.calendarData.visibleRange = response.visible_range;
          this.calendarData.data = response.dates.map((date: any) => {
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
