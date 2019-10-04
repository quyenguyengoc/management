import { EVENTTYPES } from '../shared/event-types';
import { DatePipe } from '@angular/common';

export const HEADERS = {
  mode: 'external',
  columns: {
    title: {
      title: 'Title',
      filter: false
    },
    price: {
      title: 'Price',
      filter: false,
      valuePrepareFunction: (value: number) => { return Intl.NumberFormat('vi-VN', { style:'currency', currency: 'VND' }).format(value) }
    },
    expense_type: {
      title: 'Type',
      filter: false,
      valuePrepareFunction: (value: number) => { return EVENTTYPES[value]; }
    }
  },
  actions: {
    position: 'right',
    add: false,
    edit: false,
    columnTitle: ''
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>'
  }
};
