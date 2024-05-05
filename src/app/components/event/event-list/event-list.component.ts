import { Component, OnInit } from '@angular/core';
import {NgClass, NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import { Router } from '@angular/router';
import {EventService} from "../event.service";

@Component({
  selector: 'app-event-list',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule, NgClass],
  templateUrl: './event-list.component.html',
  styleUrl: './event-list.component.css'
})
export class EventListComponent implements OnInit {
  events: any[] = [];

  constructor(
    private eventService: EventService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
  ) { }

  ngOnInit() {
    this.switchLanguage('es');
    this.getEvents();
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  getEvents () {
    let token=null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token');
    }
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
    this.router.navigate(['/create-event'])
  }
}
