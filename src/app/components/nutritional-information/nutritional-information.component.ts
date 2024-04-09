import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import { ReactiveFormsModule } from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NutritionalInformationService} from "./nutritional-information.service";
import {RegisterUserService} from "../register/registeruser.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nutritional-information',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    ReactiveFormsModule,
    TranslateModule
  ],
  templateUrl: './nutritional-information.component.html',
  styleUrl: './nutritional-information.component.css',
  providers: [NutritionalInformationService]
})
export class NutritionalInformationComponent implements OnInit {
  formData: any = {}

  role_id = 0
  currentStep: any = 1

  constructor (
    private registerUserService: RegisterUserService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  setRoleId (value: any) {
    this.role_id = value
    this.formData['role_id'] = value
  }

  nextStep () {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++
      }
    } else if (this.currentStep === 2) {
      this.saveUserData()
    }
  }

  backStep () {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  validateStep1 () {
    return this.role_id === 1 || this.role_id === 2
  }

  saveUserData () {
    this.registerUserService.createUser(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse (response: any) {
    if (this.role_id === 1) {
      this.saveSportMan(response.id)
    }
    this.toastr.success('Información nutricional guardado éxitosamente', 'Toastr fun!', {
      timeOut: 3000
    })
  }

  handleError () {
    let text = 'Error agregando la información nutricional'
    this.toastr.error(text, 'Major Error', {
      timeOut: 3000
    })
  }

  saveSportMan (id: any) {
    this.registerUserService
      .saveInfoSporPlanService({ user_id: id })
      .subscribe({
        next: this.handleUpdateResponse.bind(this),
        error: this.handleError.bind(this)
      })
  }
}
