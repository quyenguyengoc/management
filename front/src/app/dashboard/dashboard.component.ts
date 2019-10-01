import { Component, OnInit, ChangeDetectionStrategy, ViewChild, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LocalDataSource } from 'ng2-smart-table';
import { ActivatedRoute } from '@angular/router';

import { DateCellsService } from '../services/date-cells.service';
import { FormatService } from '../services/common/format.service';

import { DateCell } from '../class/calendar/date-cell';
import { EventDate } from '../class/calendar/event-date';
import { EventMemo } from '../class/calendar/event-memo';
import { CalendarComponent } from '../calendar/calendar.component';
import { MonthInfoService } from '../services/month-info.service';

@Component({
  selector: 'app-dashboard',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {

  @ViewChild('modalContent') modal_content: TemplateRef<any>;
  @ViewChild(CalendarComponent) calendar: CalendarComponent;

  edit_mode: boolean = false;

  calendar_data = { visible_range: { }, data: [] };
  selected_date: DateCell;
  selected_event: EventDate;
  month_info: {
    id: number;
    budget: {
      total: number,
      per_day: number,
      current: number
    }
    days: number,
    expense: {
      power: {
        start_at: number,
        end_at: number,
        expense: number
      },
      water: number,
      other: number,
      eating: number,
      rent: number
    }
    option: {
      water_expense: boolean,
      power_expense: boolean
    }
  }

  date_detail(date_cell: DateCell) {
    if (!!!date_cell) {
      date_cell = this.calendar_data.data.find(date => {
        return date.date == this.format.date();
      })
    }

    this.date_cells_service.get_events(date_cell.id)
      .subscribe(response => {
        date_cell.load_events(response.date_cell.events);
        this.selected_date = date_cell;
        this.selected_event = new EventDate();
        this.modal.open(this.modal_content, { size: 'lg', keyboard: false, backdrop: 'static' });
      });
  }

  select_event(event: EventDate) {
    this.selected_event = event;
  }

  toggle_memo(event: {action: string, index: number}) {
    switch(event.action) {
      case 'add':
        this.selected_event.add_new_memo();
        break;
      case 'remove':
        this.selected_event.memo[event.index].is_destroy = true;
        this.selected_event.price += this.selected_event.memo[event.index].price * -1;
        break;
      case 'undo':
        this.selected_event.memo[event.index].is_destroy = false;
        this.selected_event.price += this.selected_event.memo[event.index].price * 1;
        break;
    };
  }

  save_date() {
    let date_cell = {
      date_cell: this.selected_date.date
    };
    if (this.selected_event.new_object() && !!!this.selected_event.empty_memo()) {
      this.selected_date.events.add(this.selected_event);
    }
    this.selected_date.get_events().then(events => {
      date_cell['events_attributes'] = events.map((event: EventDate) => {
        return event.event_obj();
      });
      this.date_cells_service.save_date(this.selected_date.id, date_cell)
        .subscribe(response => {
          this.selected_event.memo = this.selected_event.memo.filter(memo => memo.available());
          this.calendar_data.data.find((date: DateCell) => {
            return date.id === response.date_cell.id;
          }).update_expense(response.date_cell);
          this.monthInfoCalc(response.month_info);
          this.selected_date.load_events(response.date_cell.events);
          if (this.selected_event.empty_memo() || this.selected_event.new_object()) {
            this.selected_event = new EventDate();
          }
          this.calendar.reload();
        });
    });
  }

  delete_event(event: any) {
    event.data.toggle_delete_event()
    let row = $(document.querySelectorAll('ng2-smart-table table tbody tr')[event.index]);
    event.data.is_destroy ? row.addClass('table-danger') : row.removeClass('table-danger');
  }

  monthInfoCalc(data: any) {
    this.month_info = data;
    this.month_info.budget.current = this.month_info.budget.total - this.month_info.expense.eating - this.month_info.expense.other - this.month_info.expense.rent;
    if (!!!this.month_info.option) {
      this.month_info.option = {
        water_expense: false,
        power_expense: false,
      }
    }
  }

  toggle_power_option() {
    this.month_info.budget.current += (this.month_info.expense.power.expense * (this.month_info.option.power_expense ? -1 : 1));
  }

  toggle_water_option() {
    this.month_info.budget.current += (this.month_info.expense.water * (this.month_info.option.water_expense ? -1 : 1));
  }

  toggle_edit_mode() {
    this.edit_mode = !this.edit_mode;
  }

  update_month_info(month_info_edit: any) {
    this.month_info.expense.power.start_at = month_info_edit.power_start;
    this.month_info.expense.power.end_at = month_info_edit.power_end;
    let params = {
      id: this.month_info.id,
      power_number_start: month_info_edit.power_start,
      power_number_end: month_info_edit.power_end
    };
    this.month_info_service.save_month_info(params)
      .subscribe((response: any) => {
        this.edit_mode = false;
        this.monthInfoCalc(response.month_info);
        this.cdRef.detectChanges();
      });
  }

  constructor(
    private modal: NgbModal,
    private route: ActivatedRoute, 
    private date_cells_service: DateCellsService,
    private format: FormatService, 
    private month_info_service: MonthInfoService,
    private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit() {
    this.route.data
      .map((data) => data['response'])
      .subscribe(
        (response) => {
          this.monthInfoCalc(response.month_info);
          this.calendar_data.visible_range = {
            start: response.month_info.start_at,
            end: response.month_info.end_at
          };
          this.calendar_data.data = response.dates.map((date: any) => {
            return new DateCell(date)
          });
        }
      )
  }
}
