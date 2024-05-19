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

  appointments: any = [];

  language: string = 'es';
  creatingSchedule: boolean = false;
  injuries: any = [];
  sportman_id: any;

  constructor(
    public toastr: ToastrService,
    public translate: TranslateService,
    public scheduleAppointmentService: ScheduleAppointmentService,
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

    const sportman_id: string | null = sessionStorage.getItem('sportman_id')
    this.sportman_id = sportman_id;
    this.getInjuries();
    this.getAppointmentsServices(sportman_id);
  }

  getAppointmentsServices(sportman_id: string | null) {

    this.scheduleAppointmentService.getScheduleAppointment(sportman_id).subscribe({
      next: (response) => {
        this.appointments = response;
      },
      error: this.handleGetAppointmentError.bind(this)
    })
  }

  getInjuryName(injury_id: string) {
    const matchingInjury = this.injuries.find((injury: any) => injury.id.toString() === injury_id.toString());
    return matchingInjury ? matchingInjury.name : "N/A"
  }

  handleGetAppointmentsResponse(response: any) {
    this.toastr.success('Datos de servicios', 'Exito', {
      timeOut: 3000
    })
  }

  handleGetAppointmentError(error: any) {
    this.toastr.error('Error obteniendo datos de servicios', 'Error', {
      timeOut: 3000
    })
  }

  getInjuries() {
    this.injuries = [{ id: "1", name: "Fractuas miembro superior", description: "Fractuas miembro superior" },
    { id: "2", name: "Fracturas miembro inferiores", description: "Fracturas miembro inferiores" },
    { id: "3", name: "Dolor en miembros superiores", description: "Dolor en miembros superiores" },
    { id: "4", name: "Dolor en miembros inferiores", description: "Dolor en miembros inferiores" },
    { id: "5", name: "Dolor en la espalda", description: "Dolor en la espalda" },
    { id: "6", name: "Quemaduras en la espalda", description: "Quemaduras en la espalda" }, { id: "7", name: "Ampollas miembros inferiores", description: "Ampollas en miembros inferiores" },
    { id: "8", name: "Ampollas miembros superiores", description: "Ampollas en miembros superiores" }];
  }

  createAppointment() {
    this.creatingSchedule = true;
  }

  closeWindow() {
    this.creatingSchedule = false;
  }

}
