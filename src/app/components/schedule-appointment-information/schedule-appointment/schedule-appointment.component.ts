import { Component, OnInit } from '@angular/core';
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


  formData: any = {}
  currentStep: number = 1;
  service: FormControl = new FormControl('', [Validators.required])
  injury: FormControl = new FormControl('', [Validators.required])
  sport: FormControl = new FormControl('', [Validators.required])
  datetimecustom = new FormControl(this.getDefaultValue(), [Validators.required, this.validateDate])
  activateErrorMessageForCategory: boolean = false
  sportSpecialist: any = [];
  sportSelected: string = '';
  injuries: any = [];
  appoinmentDate: string = '';

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private scheduleAppointmentService: ScheduleAppointmentService,
    private router: Router
  ) {}

  ngOnInit() {
    this.switchLanguage('es');

    this.sportSpecialist = [
      { id:"1", name: 'Especialista en rodilla', sport: 'Basketball' },
      { id:"2", name: 'Especialista en miembros superiores', sport: 'Tennis' },
      { id:"3", name: 'Especialista en miembros inferiores', sport: 'Soccer' }
    ];

    this.injuries = [{id:"1", name:"Fractuas miembro superior",	  description:"Fractuas miembro superior"  },
    {id:"2", name:"Fracturas miembro inferiores",	description:"Fracturas miembro inferiores"   },
    {id:"3", name:"Dolor en miembros superiores",	description:"Dolor en miembros superiores"   },
    {id:"4", name:"Dolor en miembros inferiores",	description:"Dolor en miembros inferiores"   },
    {id:"5", name:"Dolor en la espalda",	        description:"Dolor en la espalda"            },
    {id:"6", name:"Quemaduras en la espalda",	    description:"Quemaduras en la espalda"       },
    {id:"7", name:"Ampollas miembros inferiores",	description:"Ampollas en miembros inferiores"},
    {id:"8", name:"Ampollas miembros superiores",	description:"Ampollas en miembros superiores"}];
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
    console.log("Antes", this.formData)
    const name = e.target.name
    this.formData[name] = e.target.value
    console.log("Después", this.formData)
  }

  setAppointmentDate () {
    this.formData['appointment_date'] = this.datetimecustom.value ?? ''
    this.activateErrorMessageForCategory = false
  }

  saveAppointmentData () {
    const sportman_id = sessionStorage.getItem('sportman_id')
    this.formData['sportman_id'] = sportman_id;
    this.setAppointmentDate()

    console.log("Final", this.formData);

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
    this.injuries = new FormControl('', [Validators.required])
    this.datetimecustom = new FormControl('', [Validators.required])
    this.activateErrorMessageForCategory = false
  }

  handleUpdateResponse (response: any) {
    this.toastr.success('Registro exitoso de la cita con el deportológo', 'Exito', {
      timeOut: 3000
    })
    this.router.navigate(['/home'])
  }

  handleError (error: any) {
    this.toastr.error('Error registrando cita con el deportólogo', 'Error', {
      timeOut: 3000
    })
  }
}
