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

  @Input() calendar_data: {
    visible_range: { start: string, end: string },
    data: DateCell[]
  };

  @Output()
  dateClick: EventEmitter<any[]> = new EventEmitter();

  @Output()
  eventClick: EventEmitter<any[]> = new EventEmitter();

  calendarPlugins = [dayGridPlugin, interactionPlugin];

  calendar: Calendar;

  date_cells: DateCell[] = [
  ];


  initCalendar(element: any) {
    this.calendar = new Calendar(element, {
      plugins: this.calendarPlugins,
      defaultView: 'dayGridMonth',
      visibleRange: this.calendar_data.visible_range,
      dayRender: this.dayRender.bind(this)
    });
  }

  date_detail(date_cell: any) {
    this.dateClick.emit(date_cell);
  }

  dayRender(dayRenderInfo: any) {
    let date_cell = this.calendar_data.data.find(date_cell => date_cell.date === this.onlyDate(dayRenderInfo.date));
    if (date_cell) {
      $(dayRenderInfo.el).html(`
        <div class="row m-0">
          <div class="col-md-12 bg-success p-0 text-right text-white">` + date_cell.expense.all_day + `</div>
        </div>
      `)
      $(dayRenderInfo.el).addClass('align-bottom');
      $(dayRenderInfo.el).on("click", this.date_detail.bind(this, date_cell));
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
