import {Component, OnInit} from '@angular/core';
import {HeaderMainComponent} from "../header-main/header-main.component";
import {NgClass, NgIf} from "@angular/common";
import {NgMultiSelectDropDownModule} from "ng-multiselect-dropdown";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {ExerciseService} from "./exercise.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-exercise',
  standalone: true,
  imports: [
    HeaderMainComponent,
    NgIf,
    NgMultiSelectDropDownModule,
    TranslateModule,
    FormsModule,
    NgClass,
    ReactiveFormsModule
  ],
  templateUrl: './exercise.component.html',
  styleUrl: './exercise.component.css'
})
export class ExerciseComponent implements OnInit {
  currentStep: any = 1
  formData: any = {}

  sport = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  description: FormControl = new FormControl('', [Validators.required])
  duration: FormControl = new FormControl('', [Validators.required])
  intensity = new FormControl('', [Validators.required])


  constructor (
    private toastr: ToastrService,
    private translate: TranslateService,
    private exerciseService: ExerciseService,
    private router: Router
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
  }

  changeValueForm (e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
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
    } else if (this.currentStep === 4) {
      if (this.validateStep4()) {
        this.currentStep++
      }
    } else if (this.currentStep === 5) {
      if (this.validateStep5()) {
        this.saveExerciseData()
      }
    }
  }

  validateStep1 () {
    if (this.name && this.name.errors === null) {
      return true
    } else {
      this.name.markAsTouched()
      return false
    }
  }

  validateStep2 () {
    if (this.description && this.description.errors === null) {
      return true
    } else {
      this.description.markAsTouched()
      return false
    }
  }

  validateStep3 () {
    if (this.sport && this.sport.errors === null) {
      return true
    } else {
      this.sport.markAsTouched()
      return false
    }
  }

  validateStep4 () {
    if (this.duration && this.duration.errors === null) {
      return true
    } else {
      this.duration.markAsTouched()
      return false
    }
  }

  validateStep5 () {
    if (this.intensity && this.intensity.errors === null) {
      return true
    } else {
      this.intensity.markAsTouched()
      return false
    }
  }

  saveExerciseData () {
    this.exerciseService.createExercise(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse(response: {}) {
    this.toastr.success('Registro exitoso del entrenamiento', 'Exito', {
      timeOut: 3000
    })
    this.router.navigate(['/home'])
  }

  handleError(errorText: string) {
    this.toastr.error('Error registrando el entrenamiento', 'Error', {
      timeOut: 3000
    })
  }
}
