import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/core';

import * as $ from 'jquery';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

import { FormatService } from '../services/common/format.service';

import { DateCell } from '../class/calendar/date-cell';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  @Input() calendarData: {
    visibleRange: { start: string, end: string },
    data: DateCell[]
  };

  @Output()
  dateClick: EventEmitter<any[]> = new EventEmitter();

  @Output()
  eventClick: EventEmitter<any[]> = new EventEmitter();

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendar: Calendar;

  dateCells: DateCell[] = [
  ];


  initCalendar(element: any) {
    this.calendar = new Calendar(element, {
      plugins: this.calendarPlugins,
      defaultView: 'dayGridMonth',
      visibleRange: this.calendarData.visibleRange,
      dayRender: this.dayRender.bind(this)
    });
  }

  dateDetail(dateCell: any, type: string) {
    this.dateClick.emit(dateCell);
  }

  dayRender(dayRenderInfo: any) {
    let dateCell = this.calendarData.data.find(dateCell => dateCell.date === this.onlyDate(dayRenderInfo.date));
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

  onlyDate(date: Date) {
    return this.format.date(date, 'yyyy-MM-dd');
  }

  reload() {
    this.calendar.destroy();
    this.calendar.render();
  }

  constructor(private format: FormatService) { }

  ngOnInit() {
    var calendarEl = document.getElementById('calendar');

    this.initCalendar(calendarEl);

    this.calendar.render();
  }
}
