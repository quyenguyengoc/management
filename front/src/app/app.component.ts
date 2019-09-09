import { Component, OnInit, HostListener } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'another-demo-app';

  public isCollapsed = false;
  public innerWidth: any;
  public defaultSidebar: any;
  public showSettings = false;
  public showMobileMenu = false;
  public expandLogo = false;
  public config: PerfectScrollbarConfigInterface = {};

  options = {
    theme: 'light',
    dir: 'ltr',
    layout: 'vertical',
    sidebartype: 'full',
    sidebarpos: 'fixed',
    headerpos: 'fixed',
    boxed: 'full',
    navbarbg: 'skin1',
    sidebarbg: 'skin6',
    logobg: 'skin6'
  };

  toggleLogo() {
    this.expandLogo = !this.expandLogo;
  }

  handleSidebar() {
    this.innerWidth = window.innerWidth;
    switch (this.defaultSidebar) {
      case 'full':
      case 'iconbar':
        if (this.innerWidth < 1170) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;
      case 'overlay':
        if (this.innerWidth < 767) {
          this.options.sidebartype = 'mini-sidebar';
        } else {
          this.options.sidebartype = this.defaultSidebar;
        }
        break;

      default:
    }
  }

  ngOnInit() {
    this.handleSidebar();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.handleSidebar();
  }
  constructor() { }
}
