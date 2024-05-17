import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ScheduleAppointmentService } from '../schedule-appointment.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScheduleAppointmentComponent } from "../schedule-appointment/schedule-appointment.component";

@Component({
    selector: 'app-schledule-appointment-list',
    templateUrl: './schledule-appointment-list.component.html',
    standalone: true,
    styleUrls: ['./schledule-appointment-list.component.css'],
    imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule, ScheduleAppointmentComponent]
})
export class SchleduleAppointmentListComponent implements OnInit {

  appointments: any[] = [];
  language: string = 'es';
  creatingSchedule: boolean = false;

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private scheduleAppointmentService: ScheduleAppointmentService,
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
  }


  createAppointment() {
    this.creatingSchedule = true;

  }

  closeWindow(){
    this.creatingSchedule = false;
  }

}
