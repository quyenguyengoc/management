import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Calendar } from '@fullcalendar/core';
import { ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Output()
  dateClick: EventEmitter<any[]> = new EventEmitter();

  @Output()
  eventClick: EventEmitter<any[]> = new EventEmitter();

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendar: Calendar;

  visibleRange: {
    start: string, end: string
  };

  dateCells: DateCell[] = [
  ];


  initCalendar(element) {
    this.calendar = new Calendar(element, {
      plugins: this.calendarPlugins,
      defaultView: 'dayGridMonth',
      visibleRange: this.visibleRange,
      dayRender: this.dayRender.bind(this)
    });
  }

  dateDetail(dateCell, type) {
    let events = dateCell.events.filter(event => event.type === type)
    this.dateClick.emit(dateCell);
  }

  dayRender(dayRenderInfo) {
    let dateCell = this.dateCells.find(dateCell => dateCell.date.setHours(0,0,0,0) === dayRenderInfo.date.getTime());
    if (dateCell) {
      $(dayRenderInfo.el).html(`
        <div class="row m-0">
          <div class="col-md-12 p-0 text-right text-white ` + dateCell.cssForPrice(500) + ` cursor-pointer">` + dateCell.eatingCost + `</div>
          <div class="col-md-12 bg-secondary p-0 text-right text-white cursor-pointer">` + dateCell.otherCost + `</div>
        </div>
      `)
      $(dayRenderInfo.el).addClass('align-bottom');
      $(dayRenderInfo.el).find('div>div:first').on("click", this.dateDetail.bind(this, dateCell, 'eating'));
      $(dayRenderInfo.el).find('div>div:last').on("click", this.dateDetail.bind(this, dateCell, 'other'));
    }
  }

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.data
      .map((data) => data['dateCells'])
      .subscribe(
        (dateCells) => {
          this.visibleRange = { start: dateCells[0].date, end: dateCells[dateCells.length - 1].date }
          this.dateCells = dateCells.map((dateCell, index) => {
            return new DateCell({
              id: dateCell.id,
              date: new Date(dateCell.date),
              eatingCost: dateCell.eating_cost,
              otherCost: dateCell.other_cost,
              events: dateCell.events.map((event) => {
                return new EventDate({
                  id: event.id,
                  title: event.title,
                  price: event.price,
                  type: event.type === 'eating' ? 'Eating' : 'Other',
                  memo: event.memo.map((memo) => {
                    return new EventMemo(memo)
                  })
                })
              })
            })
          });
        }
      )

    var calendarEl = document.getElementById('calendar');

    this.initCalendar(calendarEl);

    this.calendar.render();
  }
}
