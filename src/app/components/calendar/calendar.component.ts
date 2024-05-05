import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { DateRange } from 'igniteui-angular';
import { CalendarService } from './calendar.service';
import { ToastrService } from 'ngx-toastr';
import {
  IgxDateRangePickerModule,
  IgxDatePickerModule,
  IgxDateTimeEditorModule,
  IgxInputGroupModule,
  IgxIconModule
} from "igniteui-angular";
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule,
    FormsModule,
    IgxDateRangePickerModule,
    IgxInputGroupModule,
    IgxDateRangePickerModule,
    IgxDatePickerModule,
    IgxDateTimeEditorModule,
    IgxInputGroupModule,
    IgxIconModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'

})
export class CalendarComponent {
  range: DateRange = { start: new Date(), end: new Date() };
  eventDatails: any = {}
  events: any = []

  constructor(private eventsService: CalendarService, private toastr: ToastrService) {
  }


  isSubscribed(event: any) {
    return this.events.length > 0;
  }
  subscribeToEvent(event: any) {
    this.events.push(event);
  }


  formatDate(dateString: any) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;

  }
  searchEvents() {   
    const formattedDateStart = this.formatDate(this.range.start);
    const formattedDateEnd = this.formatDate(this.range.end);
    console.log(formattedDateStart)
    console.log(formattedDateEnd)
    this.eventsService.getAllEvents(formattedDateStart, formattedDateEnd, 0).subscribe({
      next: this.handleResponseEvents.bind(this),
      error: this.handleErrorsEvents.bind(this),
    });
  }

  handleResponseEvents(response: any) {
    this.events = this.events.push(response.data);
  }

  handleErrorsEvents(error: any) {
    this.toastr.error('Error obteniendo los eventos', 'Error', {
      timeOut: 3000
    })
  }

  getDetails(event: any) {
    console.log(event)
    this.eventDatails = event

  }
}
