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
    this.events = response;
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

  subscribeToEvent(event: any) {
    const sportman_id = sessionStorage.getItem('sportman_id')
    this.eventsService.subscribeToEvent(event.id, sportman_id).subscribe({
      next: this.handleResponseSubscribe.bind(this),
      error: this.handleErrorsSubscribe.bind(this),
    });
  }

  handleResponseSubscribe(response: any) {
    this.toastr.success('Te has inscrito éxitosamente', 'Exito', {
      timeOut: 3000
    })
  }

  handleErrorsSubscribe(error: any) {
    this.toastr.error('Algo salió mal, intenta más tarde.', 'Error', {
      timeOut: 3000
    })
  }
}
