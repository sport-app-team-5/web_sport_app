import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Validators, ReactiveFormsModule, FormControl } from '@angular/forms'
import { RegisterUserService } from './registeruser.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  providers: [RegisterUserService]
})
export class RegisterComponent implements OnInit {
  formData: any = {}
  countries: any[] = []
  citiesResidence: any[] = []
  citiesBirth: any[] = []

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(10),
    this.passwordValidator.bind(this)
  ])
  name = new FormControl('', [Validators.required])
  lastname = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
    Validators.maxLength(50)
  ])
  document_number = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
    Validators.maxLength(20)
  ])
  confirmPassword = new FormControl('', [
    Validators.required,
    this.messagePassworsInvalid.bind(this)
  ])
  document_type = new FormControl('', [Validators.required])
  birth_city_id = new FormControl('', [Validators.required])
  birth_country_id = new FormControl('', [Validators.required])
  residence_country_id = new FormControl('', [Validators.required])
  residence_city_id = new FormControl('', [Validators.required])
  role_id = 1

  selectedType = new FormControl('')
  currentStep: any = 1

  constructor (
    private registerUserService: RegisterUserService,
    private toastr: ToastrService
  ) {}

  ngOnInit () {
    this.getCountries()
  }

  getCountries (): void {
    this.registerUserService.getCountries().subscribe(
      response => {
        this.countries = response
      },
      error => {
        console.error('Error:', error)
        this.toastr.error('Error obteniendo los países', 'Error', {
          timeOut: 3000
        })
      }
    )
  }

  getCitiesResidence () {
    this.registerUserService
      .getCities(this.residence_country_id.value)
      .subscribe(
        response => {
          this.citiesResidence = response
        },
        error => {
          console.error('Error:', error)
          this.toastr.error(
            'Error obteniendo las ciudades de residencia',
            'Major Error',
            {
              timeOut: 3000
            }
          )
        }
      )
  }

  getCitiesBirth () {
    this.registerUserService.getCities(this.birth_country_id.value).subscribe(
      response => {
        this.citiesBirth = response
      },
      error => {
        console.error('Error:', error)
        this.toastr.error(
          'Error obteniendo las ciudades de nacimiento',
          'Major Error',
          {
            timeOut: 3000
          }
        )
      }
    )
  }

  passwordValidator (control: FormControl): { [key: string]: boolean } | null {
    const value: string = control.value || ''
    const hasNumber = /\d/.test(value)
    const hasLetter = /[a-zA-Z]/.test(value)
    const valid = value && hasNumber && hasLetter
    return valid ? null : { invalidPassword: true }
  }

  messagePassworsInvalid (
    control: FormControl
  ): { [key: string]: boolean } | null {
    const value: string = control.value || ''
    const passwordValue = (this.password && this.password.value) || ''
    if (this.password === null || this.password === undefined) {
      return null
    }
    const valid = passwordValue == value
    return valid ? null : { invalidConfirmPassword: true }
  }

  nextStep () {
    if (this.currentStep === 1) {
      this.currentStep++
    } else if (this.currentStep === 2) {
      if (this.validateStep2()) {
        this.currentStep++
      }
    } else if (this.currentStep === 3) {
      if (this.validateStep3()) {
        this.currentStep++
      }
    } else if (this.currentStep === 4) {
      this.saveUserData()
    }
  }

  validateStep2 () {
    return (
      !!this.email.value &&
      !!this.password.value &&
      !!this.confirmPassword.value
    )
  }

  validateStep3 () {
    return (
      !!this.name.value &&
      !!this.lastname.value &&
      !!this.document_type.value &&
      !!this.document_number.value
    )
  }
  validateStep4 () {
    let isComplete: Boolean = false
    if ((this.role_id === 1)) {
      isComplete =
        !!this.birth_city_id.value &&
        !!this.birth_country_id.value &&
        !!this.residence_country_id.value &&
        !!this.residence_city_id.value
    } else if ((this.role_id === 2)) {
      isComplete =
        !!this.residence_country_id.value && !!this.residence_city_id.value
    }
    return isComplete
  }

  validateStep5 () {
    return true
  }

  backStep () {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  setRoleId (value: any) {
    this.formData['role_id'] = value
  }

  changeValueForm (e: any) {
    const name = e.target.name
    const value = e.target.value
    if (name === 'residence_country_id') {
      this.getCitiesResidence()
    }
    if (name === 'birth_country_id') {
      this.getCitiesBirth()
    }
    this.formData[name] = value
  }

  saveUserData () {
    this.registerUserService.createUser(this.formData).subscribe(
      response => {
        this.citiesBirth = response
        this.toastr.success('Usuario guardado éxitosamente', 'Toastr fun!', {
          timeOut: 3000
        })
      },
      error => {
        console.error('Error:', error)
        this.toastr.error('Error almacenando el usuario', 'Major Error', {
          timeOut: 3000
        })
      }
    )
  }
}