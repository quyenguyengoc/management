import { EVENTTYPES } from '../shared/event-types';

export const HEADERS = {
  mode: 'external',
  columns: {
    title: {
      title: 'Title',
      filter: false
    },
    price: {
      title: 'Price',
      filter: false
    },
    type: {
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
