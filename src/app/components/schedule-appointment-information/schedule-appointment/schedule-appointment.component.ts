import { Component, OnInit ,EventEmitter,Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {ScheduleAppointmentService} from "../schedule-appointment.service";
import { Router } from '@angular/router';

@Component({
  selector: 'app-schedule-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule, ReactiveFormsModule],
  templateUrl: './schedule-appointment.component.html',
  styleUrls: ['./schedule-appointment.component.css']
})
export class ScheduleAppointmentComponent implements OnInit {

  @Output() closeWindow = new EventEmitter<void>();  
  @Output() getAppointmentsServices = new EventEmitter<void>();
  
  formData: any = {}
  currentStep: number = 1;
  service: FormControl = new FormControl('', [Validators.required])
  injury: FormControl = new FormControl('', [Validators.required])
  sport: FormControl = new FormControl('', [Validators.required])
  datetimecustom: FormControl = new FormControl(this.getDefaultValue(), [Validators.required, this.validateDate])
  activateErrorMessageForCategory: boolean = false
  sportSpecialist: any = [];
  sportSelected: string = '';
  injuries: any = [];
  appoinmentDate: string = '';
  language: string = 'es';

  constructor(
    public toastr: ToastrService,
    public translate: TranslateService,
    public scheduleAppointmentService: ScheduleAppointmentService,
    public router: Router
  ) {}

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

    this.getSportSpecialistServices();
    this.getInjuries();
  }

  switchLanguage (language: string): void {
    this.translate.use(language);
  }

  backStep () {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  nextStep () {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++
      }
    } else if (this.currentStep === 2) {
      if (this.validateStep2()) {
        this.currentStep++
      }
    } else if (this.currentStep === 3) {
      if (this.validateStep3()) {
        this.currentStep++
      }
    }
    else if (this.currentStep === 4) {
      if (this.validateStep4()) {
         this.saveAppointmentData()
      }
    }
  }

  validateStep1 () {
    if (this.sport && this.sport.errors === null) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      this.service.markAsTouched()
      return false
    }
  }

  validateStep2 () {
    if (this.service && this.service.errors === null) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      this.service.markAsTouched()
      return false;
    }
  }

  validateStep3 () {

    if (this.injury && this.injury.errors === null) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      this.injury.markAsTouched()
      return false
    }
  }

  validateStep4 () {
    if (this.datetimecustom && this.datetimecustom.errors === null) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      this.datetimecustom.markAsTouched()
      return false
    }
  }

  validateDate(control: { value: string | number | Date; }) {
    const fechaIngresada = new Date(control.value);
    return fechaIngresada && isNaN(fechaIngresada.getTime()) ? { 'fechaInvalida': true } : null;
  }

  getDefaultValue() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 2);
    return tomorrow.toISOString().slice(0, 16);
  }

  getMinValue() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().slice(0, 16);
  }
  getMaxValue() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 365);
    return tomorrow.toISOString().slice(0, 16);
  }

  changeValueForm (e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  setAppointmentDate () {
    this.formData['appointment_date'] = this.datetimecustom.value ?? ''
    this.activateErrorMessageForCategory = false
  }

  saveAppointmentData () {
    const sportman_id = sessionStorage.getItem('sportman_id')
    this.formData['sportman_id'] = sportman_id;
    this.setAppointmentDate()

    this.scheduleAppointmentService.createScheduleAppointment(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      complete: this.cleanData.bind(this),
      error: this.handleError.bind(this)
    })
  }

  cleanData(){
    this.formData = {}
    this.sport = new FormControl('', [Validators.required])
    this.service = new FormControl('', [Validators.required])
    this.injury = new FormControl('', [Validators.required])
    this.datetimecustom = new FormControl('', [Validators.required])
    this.activateErrorMessageForCategory = false
  }

  handleUpdateResponse (response: any) {
    this.toastr.success('Registro exitoso de la cita con el deportológo', 'Exito', {
      timeOut: 3000
    })
    this.closeWindow.emit();
    this.getAppointmentsServices.emit();
  }

  handleError (error: any) {
    this.toastr.error('Error registrando cita con el deportólogo', 'Error', {
      timeOut: 3000
    })
  }

  getInjuries() {
    this.injuries =
    [{id:"1", name:"Fractuas miembro superior",	description:"Fractuas miembro superior"},
     {id:"2", name:"Fracturas miembro inferiores", description:"Fracturas miembro inferiores"},
     {id:"3", name:"Dolor en miembros superiores", description:"Dolor en miembros superiores"},
     {id:"4", name:"Dolor en miembros inferiores", description:"Dolor en miembros inferiores"},
     {id:"5", name:"Dolor en la espalda", description:"Dolor en la espalda"},
     {id:"6", name:"Quemaduras en la espalda", description:"Quemaduras en la espalda"},
     {id:"7", name:"Ampollas miembros inferiores", description:"Ampollas en miembros inferiores"},
     {id:"8", name:"Ampollas miembros superiores", description:"Ampollas en miembros superiores"}];
  }

  getSportSpecialistServices(): void {
    const serviceType: string = "SPORT_SPECIALIST"
    this.scheduleAppointmentService.getServiceByType(serviceType).subscribe({
      next: (response) => {this.sportSpecialist = response;},
      error: this.handleGetAppointmentError.bind(this)
    })
  }

  handleGetAppointmentsResponse (response: any) {
    this.toastr.success('Datos de servicios', 'Exito', {
      timeOut: 3000
    })
  }

  handleGetAppointmentError (error: any) {
    this.toastr.error('Error obteniendo datos de servicios', 'Error', {
      timeOut: 3000
    })
  }

}
