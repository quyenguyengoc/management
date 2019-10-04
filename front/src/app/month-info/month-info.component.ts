import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormatService } from '../services/common/format.service';

@Component({
  selector: 'app-month-info',
  templateUrl: './month-info.component.html',
  styleUrls: ['./month-info.component.scss']
})
export class MonthInfoComponent implements OnInit {

  @Input() edit_mode: boolean;
  @Input() month_info: {
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

  @Output() on_toggle_edit_mode = new EventEmitter();
  @Output() on_update_month_info: EventEmitter<{ power_start: number, power_end: number }> = new EventEmitter();
  @Output() on_toggle_water_option = new EventEmitter();
  @Output() on_toggle_power_option = new EventEmitter();

  month_info_edit: {
    power_start: number,
    power_end: number
  } = {
    power_start: 0,
    power_end: 0
  }

  toggle_edit_mode() {
    this.on_toggle_edit_mode.emit();
    if (!!!this.edit_mode) {
      this.month_info_edit.power_start = this.month_info.expense.power.start_at;
      this.month_info_edit.power_end = this.month_info.expense.power.end_at;
    }
  }

  update_month_info() {
    this.on_update_month_info.emit(this.month_info_edit);
  }

  toggle_power_option() {
    this.on_toggle_power_option.emit()
  }

  toggle_water_option() {
    this.on_toggle_water_option.emit()
  }

  to_vnd(value: number) {
    return this.format.to_vnd(value);
  }

  constructor(private format: FormatService) { }

  ngOnInit() {
  }

}
