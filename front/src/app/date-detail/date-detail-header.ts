import { EVENTTYPES } from '../shared/event-types';

export const HEADERS = {
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
      valuePrepareFunction: (value: number) => { return EVENTTYPES[value] }
    }
  },
  actions: {
    position: 'right',
    add: false,
    edit: false,
    columnTitle: ''
  },
  delete: {
    deleteButtonContent: '<i class="ti-trash text-danger m-r-10"></i>',
    saveButtonContent: '<i class="ti-save text-success m-r-10"></i>',
    cancelButtonContent: '<i class="ti-close text-danger"></i>'
  }
};
