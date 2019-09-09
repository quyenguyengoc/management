import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import * as $ from 'jquery';
import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html'
})
export class CalendarComponent implements OnInit {

  @Output()
  dateClick: EventEmitter<any[]> = new EventEmitter();

  @Output()
  eventClick: EventEmitter<any[]> = new EventEmitter();

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendar: Calendar;

  validRange = {
    start: '2019-09-10',
    end: '2019-10-09'
  };

  events: EventDate[] = [
    new EventDate({ id: 1, title: 'event 1', memo: [ new EventMemo({ content: 'Noodle(x2)', price: 30000, isDestroy: false }), new EventMemo({ content: 'Noodle(x3)', price: 45000, isDestroy: false }) ], price: 75000, type: 'Eating' }),
    new EventDate({ id: 2, title: 'event 2', memo: [ new EventMemo({ content: 'Noodle(x2)', price: 30000, isDestroy: false }) ], price: 30000, type: 'Eating' }),
    new EventDate({ id: 3, title: 'event 3', memo: [ new EventMemo({ content: 'Big C', price: 20000, isDestroy: false }) ], price: 20000, type: 'Other' })
  ];

  startDate = new Date('2019-09-10 00:00:00');

  dateCells: DateCell[] = [
  ];


  initCalendar(element) {
    this.calendar = new Calendar(element, {
      plugins: this.calendarPlugins,
      defaultView: 'dayGridMonth',
      validRange: this.validRange,
      dayRender: this.dayRender.bind(this)
    });
  }

  dateDetail(dateCell, type) {
    let events = dateCell.events.filter(event => event.type === type)
    this.dateClick.emit(dateCell);
  }

  dayRender(dayRenderInfo) {
    let dateCell = this.dateCells.find(dateCell => dateCell.date.getTime() === dayRenderInfo.date.getTime());
    if (dateCell) {
      $(dayRenderInfo.el).html(`
        <div class="row m-0">
          <div class="col-md-12 p-0 text-right text-white ` + dateCell.cssForPrice(500) + `">` + dateCell.eatingCost + `</div>
          <div class="col-md-12 bg-secondary p-0 text-right text-white ">` + dateCell.otherCost + `</div>
        </div>
      `)
      $(dayRenderInfo.el).addClass('align-bottom');
      $(dayRenderInfo.el).find('div>div:first').on("click", this.dateDetail.bind(this, dateCell, 'eating'));
      $(dayRenderInfo.el).find('div>div:last').on("click", this.dateDetail.bind(this, dateCell, 'other'));
    }
  }

  constructor() { }

  ngOnInit() {

    Array.from({ length: 31 }).forEach((x, i) => {
      this.dateCells.push(
        new DateCell({
          date: new Date(this.startDate.setDate(this.startDate.getDate() + 1)),
          eatingCost: Math.floor(Math.random() * (2000 - 300) + 300),
          otherCost: Math.floor(Math.random() * (2000 - 300) + 300),
          events: Object.assign([], this.events)
        })
      )
    });

    var calendarEl = document.getElementById('calendar');

    this.initCalendar(calendarEl);

    this.calendar.render();
  }
}
