import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-customizer',
  templateUrl: './customizer.component.html'
})
export class CustomizerComponent implements OnInit {

  @Input()
  options: any;

  constructor() { }

  ngOnInit() {
  }

}
