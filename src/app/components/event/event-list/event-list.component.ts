import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';
import {EventService} from "../event.service";
import { EventCreateComponent } from '../event-create/event-create.component';

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule, NgClass,EventCreateComponent],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any[] = [];
  language: string = 'es';
  creatingEvent: boolean = false;

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
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
    this.getEvents();
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  getEvents () {
    this.eventService.getEvents().subscribe({
      next: (response) => {this.events = response },
      error: (err) => {
        this.toastr.error('Error obteniendo los eventos', 'Error', {
          timeOut: 3000
        });
      }
    });
  }

  createEvent() {
    this.creatingEvent = true;

  }

  closeWindow(){
    this.creatingEvent = false;
  }
}
