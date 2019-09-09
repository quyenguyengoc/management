import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

  @Output() toggleSidebar = new EventEmitter<void>();

  constructor() { }

  ngOnInit() {
  }

}
