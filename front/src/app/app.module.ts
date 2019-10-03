import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { registerLocaleData } from '@angular/common';
import localeVN from '@angular/common/locales/vi';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { Ng2SmartTableModule } from 'ng2-smart-table';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { CalendarComponent } from './calendar/calendar.component';
import { HeaderComponent } from './shared/header/header.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { NavigationComponent } from './shared/navigation/navigation.component';
import { BreadcrumbComponent } from './shared/breadcrumb/breadcrumb.component';
import { CustomizerComponent } from './shared/customizer/customizer.component';
import { EventFormComponent } from './date-detail/event-form/event-form.component';
import { EventsListComponent } from './date-detail/events-list/events-list.component';
import { DateDetailComponent } from './date-detail/date-detail/date-detail.component';
import { MonthInfoComponent } from './month-info/month-info.component';

import { SpinnerService } from '../app/services/common/spinner.service';
import { SpinnerInterCeptor } from './interceptors/spinner.interceptor';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 1,
  wheelPropagation: true,
  minScrollbarLength: 20
};

registerLocaleData(localeVN, 'vi');

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SpinnerComponent,
    CalendarComponent,
    HeaderComponent,
    SidebarComponent,
    NavigationComponent,
    BreadcrumbComponent,
    CustomizerComponent,
    EventFormComponent,
    EventsListComponent,
    DateDetailComponent,
    MonthInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    PerfectScrollbarModule,
    FullCalendarModule,
    Ng2SmartTableModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    DatePipe,
    CurrencyPipe,
    SpinnerService,
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterCeptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
