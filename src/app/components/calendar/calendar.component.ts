import { CommonModule } from '@angular/common';
import { Component,OnInit } from '@angular/core';
import { CalendarService } from './calendar.service';
import { ToastrService } from 'ngx-toastr';
import {
  IgxDateRangePickerModule,
  IgxDatePickerModule,
  IgxDateTimeEditorModule,
  IgxInputGroupModule,
  IgxIconModule, DateRange
} from "igniteui-angular";
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

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
    IgxIconModule,TranslateModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.css'

})
export class CalendarComponent implements OnInit {
  range: DateRange = { start: new Date(), end: new Date() };
  eventDatails: any = {}
  isEvetActive: any;
  events: any = [];
  suscribedEvents: any = [];
  showButtonToSuscribe: boolean = false;
  risk: any;
  language: string = 'es';

  constructor(
    private eventsService: CalendarService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      let idioma = localStorage.getItem('lang');
      if (idioma != null) {
        this.translate.setDefaultLang(idioma);
        this.language = idioma;
      } else {
        this.translate.setDefaultLang('es');
        this.language = 'es';
      }
    }
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
    const sportman_id = sessionStorage.getItem('sportman_id')

    const formattedDateStart = this.formatDate(this.range.start);
    const formattedDateEnd = this.formatDate(this.range.end);
    this.eventsService.getAllEvents(formattedDateStart, formattedDateEnd, sportman_id).subscribe({
      next: this.handleResponseEvents.bind(this),
      error: this.handleErrorsEvents.bind(this),
    });

    this.eventsService.getAllEventsSuscribed(sportman_id, formattedDateStart, formattedDateEnd).subscribe({
      next: this.handleResponseSuscribedEvents.bind(this),
      error: this.handleErrorsEvents.bind(this),
    })
  }
  handleResponseSuscribedEvents(response: any) {
    this.suscribedEvents = response;
  }
  handleResponseEvents(response: any) {
    this.events = response;
  }

  handleErrorsEvents(error: any) {
    this.toastr.error('Error obteniendo los eventos', 'Error', {
      timeOut: 3000
    })
  }

  getDetails(event: any, showButtons: boolean) {
    this.showButtonToSuscribe = showButtons;
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
    this.showButtonToSuscribe = false;
    this.searchEvents()
  }

  handleErrorsSubscribe(error: any) {
    this.toastr.error('Algo salió mal, intenta más tarde.', 'Error', {
      timeOut: 3000
    })
  }

  getDay(date: any) {
    const dateFormat = new Date(date);
    const day = dateFormat.getDate();
    return day;
  }

  getType(type: any) {
    return type === 'ROUTE' ? 'Ruta' : 'Evento'
  }



  setClassAcitve(id: any) {
    return {
      '': true,
      'active-item-list': this.eventDatails.id === id
    }
  }

  handleKeyDown($event: KeyboardEvent) {
    this.risk = "Riesgo gourmet";
  }


}
