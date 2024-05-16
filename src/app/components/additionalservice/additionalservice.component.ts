import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { AdditionalServiceService } from './additional-service.service'
import { Router } from '@angular/router'
import { HeaderMainComponent } from '../header-main/header-main.component'

@Component({
  selector: 'app-additionalservice',
  templateUrl: './additionalservice.component.html',
  styleUrls: ['./additionalservice.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, HeaderMainComponent],
  providers: [AdditionalServiceService]
})
export class AdditionalserviceComponent implements OnInit {
  currentStep: any = 1
  formData: any = {}

  type: any = null
  cost = new FormControl('', [Validators.required])
  description = new FormControl('', [Validators.required])
  is_active: boolean = true
  activateErrorMessageForTypeService: boolean = false
  language: string = 'es';

  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private adittionalService: AdditionalServiceService,
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

  getButtonClassesTypeTransport() {
    return {
      'question-button': true,
      'active-button': this.type === 'TRANSPORT'
    }
  }

  getButtonClassesTypeAccompanient() {
    return {
      'question-button': true,
      'active-button': this.type === 'ACCOMPANIMENT'
    }
  }

  getButtonClassesTypeMecanic() {
    return {
      'question-button': true,
      'active-button': this.type === 'MECANIC'
    }
  }

  getButtonClassesTypeSportSpecialist() {
    return {
      'question-button': true,
      'active-button': this.type === 'SPORT_SPECIALIST'
    }
  }

  getButtonClassesTypeNutritional() {
    return {
      'question-button': true,
      'active-button': this.type === 'NUTRITIONAL'
    }
  }

  changeValueForm(e: any) {
    const name = e.target.name
    const value = e.target.value
    this.formData[name] = value
  }
  switchLanguage(language: string): void {
    this.translate.use(language)
  }
  setServiceType(value: any) {
    this.type = value
    this.formData['type'] = value
    this.activateErrorMessageForTypeService = false
  }

  backStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  nextStep() {
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
        this.saveServiceData()
      }
    }
  }

  validateStep1() {
    if (this.type) {
      return true
    } else {
      this.activateErrorMessageForTypeService = true
      return false
    }
  }

  validateStep2() {
    if (this.cost && this.cost.errors === null) {
      return true
    } else {
      this.cost.markAsTouched()
      return false
    }
  }

  validateStep3() {
    if (this.description && this.description.errors === null) {
      return true
    } else {
      this.description.markAsTouched()
      return false
    }
  }

  saveServiceData() {
    this.formData['is_active'] = this.is_active
    this.adittionalService.registerAdditionalService(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse(response: any) {
    this.toastr.success('Registro exitoso del servicio', 'Exito', {
      timeOut: 3000
    })
    this.router.navigate(['/home'])
  }

  handleError(error: any) {
    this.toastr.error('Error registrando el servicio', 'Error', {
      timeOut: 3000
    })
  }
}
