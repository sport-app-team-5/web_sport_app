import { Component, OnInit } from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {CommonModule} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";

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
  injuries: any = [];

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.switchLanguage('es');
    this.sportSpecialist = [
      { name: 'Especialista en rodilla', sport: 'Basketball' },
      { name: 'Especialista en miembros superiores', sport: 'Tennis' },
      { name: 'Especialista en miembros inferiores', sport: 'Soccer' }
    ];

    this.injuries = [{"name":"Fractuas miembro superior",	    "description":"Fractuas miembro superior"  },
    {name:"Fracturas miembro inferiores",	description:"Fracturas miembro inferiores"   },
    {name:"Dolor en miembros superiores",	description:"Dolor en miembros superiores"   },
    {name:"Dolor en miembros inferiores",	description:"Dolor en miembros inferiores"   },
    {name:"Dolor en la espalda",	        description:"Dolor en la espalda"            },
    {name:"Quemaduras en la espalda",	    description:"Quemaduras en la espalda"       },
    {name:"Ampollas miembros inferiores",	description:"Ampollas en miembros inferiores"},
    {name:"Ampollas miembros superiores",	description:"Ampollas en miembros superiores"}];
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
        // this.saveProductData()
      }
    }
  }

  validateStep1 () {
    if (this.sport) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      return false
    }
  }

  validateStep2 () {
    if (this.service && this.service.errors === null) {
      return true
    } else {
      this.service.markAsTouched()
      return false;
    }
  }

  validateStep3 () {
    if (this.injury && this.injury.errors === null) {
      return true
    } else {
      this.injury.markAsTouched()
      return false
    }
  }

  validateStep4 () {
    if (this.datetimecustom && this.datetimecustom.errors === null) {
      return true
    } else {
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

  getButtonClassesSports(value: string) {
    return {
      'question-button': true,
      //'active-button': this.sport === value
    }
  }
  setSport(arg0: string) {
  throw new Error('Method not implemented.');
  }

  changeValueForm (e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  // saveProductData () {
  //   this.productService.createProduct(this.formData).subscribe({
  //     next: this.handleUpdateResponse.bind(this),
  //     complete: this.cleanData.bind(this),
  //     error: this.handleError.bind(this)
  //   })
  // }

  cleanData(){
    this.formData = {}
    this.sport = new FormControl('', [Validators.required])
    this.service = new FormControl('', [Validators.required])
    this.injuries = new FormControl('', [Validators.required])
    this.datetimecustom = new FormControl('', [Validators.required])
    this.activateErrorMessageForCategory = false
  }
}
