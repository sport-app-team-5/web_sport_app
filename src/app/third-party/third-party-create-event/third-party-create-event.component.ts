import { Component, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderMainComponent } from '../../components/header-main/header-main.component';
import { RegisterUserService } from '../../components/register/registeruser.service';
import { ThirdPartyService } from './third-party.service';


@Component({
  selector: 'app-third-party-create-event',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, TranslateModule, HeaderMainComponent],
  templateUrl: './third-party-create-event.component.html',
  styleUrl: './third-party-create-event.component.css'
})
export class ThirdPartyCreateEventComponent implements OnInit {
  sport: any = null;

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
  countries: any[] = []
  cities: any[] = []

  nameEvent = new FormControl('', [Validators.required, Validators.minLength(2)])
  datetimecustom = new FormControl(this.getDefaultValue(), [Validators.required, this.validateDate])

  place = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(150)
  ])
  description = new FormControl('', [
    Validators.required,
    Validators.minLength(1),
    Validators.maxLength(256)
  ])

  country_id = new FormControl('', [Validators.required])
  city_id = new FormControl('', [Validators.required])
  quantity = new FormControl('', [Validators.required, this.isValidNumber])


  role_id = 0
  activateErrorMessageForRoleId: boolean = false

  selectedType = new FormControl('')
  currentStep: any = 1
  isActive: boolean = false

  validateDate(control: { value: string | number | Date; }) {
    const fechaIngresada = new Date(control.value);
    return fechaIngresada && isNaN(fechaIngresada.getTime()) ? { 'fechaInvalida': true } : null;
  }

  goToHome() {
    throw new Error('Method not implemented.');
  }

  is_active: boolean = true
  activateErrorMessageForTypeService: boolean = false
  activateErrorMessageForSportType: boolean = false
  type: any = null

  isValidNumber(control: { value: number; }) {
    return (typeof control.value !== 'number' || control.value < 1) ? { 'error': true } : null;
  }
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private registerUserService: RegisterUserService,
    private thirdPartyService: ThirdPartyService,
    private router: Router
  ) { }



  ngOnInit() {
    this.switchLanguage('es')
    this.getDefaultValue()
    this.getMinValue()
    this.getMaxValue()
    this.getCountries()
  }

  getButtonClassesTypeEvent() {
    return {
      'question-button': true,
      'active-button': this.type === 'EVENT'
    }
  }

  getButtonClassesTypeRoute() {
    return {
      'question-button': true,
      'active-button': this.type === 'ROUTE'
    }
  }

  getButtonClassesTypeCycling() {
    return {
      'question-button': true,
      'active-button': this.sport === 'CYCLING'
    }
  }

  getButtonClassesTypeRunning() {
    return {
      'question-button': true,
      'active-button': this.sport === 'RUNNING'
    }
  }

  changeValueForm (e: any) {
    const name = e.target.name
    const value = e.target.value
    if (name === 'country_id') {
      this.getCities()
    }
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }
  setServiceType(value: any) {
    this.type = value
    this.activateErrorMessageForTypeService = false
  }

  setSportType(value: string) {
    this.sport = value
    this.activateErrorMessageForSportType = false;
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
        this.currentStep++
      }
    } else if (this.currentStep === 4) {
      if (this.validateStep4()) {
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
    if (this.sport) {
      return true
    } else {
      this.activateErrorMessageForSportType = true
      return false
    }
  }

  validateStep3() {
    if (!!this.nameEvent.value &&
      !!this.datetimecustom.value &&
      !!this.country_id.value &&
      !!this.city_id.value &&
      this.nameEvent.errors === null &&
      this.datetimecustom.errors === null ) {
      return true
    } else {
      this.nameEvent.markAsTouched()
      this.datetimecustom.markAsTouched()

      this.country_id.markAsTouched()

      this.city_id.markAsTouched()
      return false
    }
  }

  validateStep4() {
    if (!!this.quantity.value &&
      !!this.place.value &&
      !!this.description.value) {
      return true
    } else {
      this.quantity.markAsTouched()
      this.place.markAsTouched()

      this.description.markAsTouched()

      return false
    }
  }

  getCountries(): void {
    this.registerUserService.getCountries().subscribe({
      next: (response) => {
        this.countries = response;

      },
      error: (error) => {

         if (this.currentStep !== 1) {
          this.toastr.error('Error obteniendo los países', 'Error', {
            timeOut: 3000
          });
         }
      }
    });
  }

  getCities () {
    this.registerUserService
      .getCities(this.country_id.value)
      .subscribe({
        next: (response) => {
          this.cities = response;
        },
        error: (error) => {
          this.toastr.error(
            'Error obteniendo las ciudades',
            'Major Error',
            {
              timeOut: 3000
            }
          );
        }
      });
  }

  saveServiceData() {
    const eventData: EventData = {
      city_id: parseInt(this.city_id.value ?? ''),
      sport_id: this.sport === SportType.CYCLING ? 1 : 2,
      location: this.place.value ?? '',
      date: this.datetimecustom.value ?? '',
      capacity: parseInt(this.quantity.value ?? ''),
      description: this.description.value ?? '',
      type: this.type
    };
    console.log(eventData)
    this.thirdPartyService.registerEvent(eventData).subscribe({
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

enum SportType {
  CYCLING = 'CYCLING',
  RUNNING = 'RUNNING'
}

interface EventData {
  third_party_id?: number;
  city_id: number;
  sport_id: number;
  location: string;
  date: string;
  capacity: number;
  description: string;
  type: string;
}
