import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Calendar } from '@fullcalendar/core';

import * as $ from 'jquery';
import dayGridPlugin from '@fullcalendar/daygrid';
import bootstrapPlugin from '@fullcalendar/bootstrap';
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
  date_click: EventEmitter<any[]> = new EventEmitter();

  @Output()
  on_change_month: EventEmitter<string> = new EventEmitter();

  calendar_plugins = [dayGridPlugin, interactionPlugin];

  calendar: Calendar;

  date_cells: DateCell[] = [
  ];


  initCalendar(element: any) {
    this.calendar = new Calendar(element, {
      plugins: this.calendar_plugins,
      defaultView: 'dayGridMonth',
      themeSystem: 'bootstrap',
      defaultDate: (new Date(this.calendar_data.visible_range.start)),
      visibleRange: this.calendar_data.visible_range,
      dayRender: this.day_render.bind(this),
      customButtons: {
        prev_btn: {
          text: '',
          icon: 'fc-icon-chevron-left',
          click: this.change_month.bind(this, 'prev')
        },
        next_btn: {
          text: '',
          icon: 'fc-icon-chevron-right',
          click: this.change_month.bind(this, 'next')
        }
      },
      header: {
        right: 'today prev_btn next_btn'
      }
    });
  }

  change_month(action: string) {
    this.on_change_month.emit(action);
  }

  date_detail(date_cell: any) {
    this.date_click.emit(date_cell);
  }

  day_render(dayRenderInfo: any) {
    let date_cell = this.calendar_data.data.find(date_cell => date_cell.date === this.only_date(dayRenderInfo.date));
    let el_index = $(dayRenderInfo.el).index();
    let td_el = $(dayRenderInfo.el).parents('div.fc-bg').next().find('td')[el_index];
    if (date_cell) {
      $(dayRenderInfo.el).html(`
        <div class="row m-0">
          <div class="col-md-12 bg-success p-0 text-right text-white">` + date_cell.expense.all_day + `</div>
        </div>
      `)
      $(td_el).removeClass('fc-other-month');
      $(dayRenderInfo.el).on("click", this.date_detail.bind(this, date_cell)).addClass('align-bottom');
    } else {
      $(td_el).addClass('fc-other-month');
    }
  }

  only_date(date: Date) {
    return this.format.date(date, 'yyyy-MM-dd');
  }

  reload() {
    this.calendar.destroy();
    this.calendar.render();
    this.calendar.gotoDate(new Date(this.calendar_data.visible_range.start));
  }

  prev_month() {
    this.calendar.prev();
  }

  next_month() {
    this.calendar.next();
  }

  start_at() {
    return this.calendar.view.currentStart;
  }

  constructor(private format: FormatService) { }

  ngOnInit() {
    var calendarEl = document.getElementById('calendar');

    this.initCalendar(calendarEl);

    this.calendar.render();
  }
}
