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


  currentStep: number = 1;
  cost: FormControl = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  description: FormControl = new FormControl('', [Validators.required])
  activateErrorMessageForCategory: boolean = false
  sportSpecialist: any = [];
  injuries: any = [];
  sport: string = '';

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
        // this.saveProductData()
      }
    }
  }

  getButtonClassesSports(value: string) {
    return {
      'question-button': true,
      'active-button': this.sport === value
    }
  }
  setSport(arg0: string) {
  throw new Error('Method not implemented.');
  }

  validateStep1 () {
    if (this.description) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      return false
    }
  }

  validateStep2 () {
    if (this.name && this.name.errors === null) {
      return true
    } else {
      this.name.markAsTouched()
    }
    return true
  }

  validateStep3 () {
    if (this.cost && this.cost.errors === null) {
      return true
    } else {
      this.cost.markAsTouched()
      return false
    }
  }

}
