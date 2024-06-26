import { Component, OnInit, Output ,EventEmitter } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { HeaderMainComponent } from "../../header-main/header-main.component";
import { NgIf } from "@angular/common";
import { TranslateModule, TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { Router } from "@angular/router";
import { TrainingService } from "../training.service";


@Component({
  selector: 'app-training-create',
  standalone: true,
  imports: [FormsModule, HeaderMainComponent, NgIf, TranslateModule, ReactiveFormsModule],
  templateUrl: './training-create.component.html',
  styleUrl: './training-create.component.css'
})
export class TrainingCreateComponent implements OnInit {
  @Output() closeWindow = new EventEmitter<void>();
  @Output()  getTrainings = new EventEmitter<void>();
 
  currentStep: any = 1
  formData: any = {"is_inside_house":true};
  sport = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  description: FormControl = new FormControl('', [Validators.required])
  duration: FormControl = new FormControl('', [Validators.required])
  intensity = new FormControl('', [Validators.required])
  is_inside_house = new FormControl('Si', [Validators.required])
  language: string = 'es';
  
  constructor(
    private toastr: ToastrService,
    private translate: TranslateService,
    private exerciseService: TrainingService,
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

  changeValueForm(e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  backStep() {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  nextStep() {
    switch (this.currentStep) {
      case 1:
        if (this.validateStep1()) {
          this.currentStep++;
        }
        break;
      case 2:
        if (this.validateStep2()) {
          this.currentStep++;
        }
        break;
      case 3:
        if (this.validateStep3()) {
          this.currentStep++;
        }
        break;
      case 4:
        if (this.validateStep4()) {
          this.currentStep++;
        }
        break;
      case 5:
        if (this.validateStep5()) {
          this.currentStep++;
        }
        break;
      case 6:
        this.saveTrainingData();
        break;
    }
  }

  validateStep1() {
    if (this.name && this.name.errors === null) {
      return true
    } else {
      this.name.markAsTouched()
      return false
    }
  }

  validateStep2() {
    if (this.description && this.description.errors === null) {
      return true
    } else {
      this.description.markAsTouched()
      return false
    }
  }

  validateStep3() {
    if (this.sport && this.sport.errors === null) {
      return true
    } else {
      this.sport.markAsTouched()
      return false
    }
  }

  validateStep4() {
    if (this.duration && this.duration.errors === null) {
      return true
    } else {
      this.duration.markAsTouched()
      return false
    }
  }

  validateStep5() {
    if (this.intensity && this.intensity.errors === null) {
      return true
    } else {
      this.intensity.markAsTouched()
      return false
    }
  }

  saveTrainingData() {
    this.exerciseService.createTraining(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse(response: {}) {
    this.toastr.success('Registro exitoso del entrenamiento', 'Exito', {
      timeOut: 3000
    })
    this.closeWindow.emit();
    this. getTrainings.emit();
    this.router.navigate(['/home'])
  }

  handleError(errorText: string) {
    this.toastr.error('Error registrando el entrenamiento', 'Error', {
      timeOut: 3000
    })
  }

}
