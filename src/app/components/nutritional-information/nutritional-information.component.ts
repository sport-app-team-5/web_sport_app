import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {FormControl, ReactiveFormsModule, Validators} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NutritionalInformationService} from "./nutritional-information.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-nutritional-information',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule],
  templateUrl: './nutritional-information.component.html',
  styleUrl: './nutritional-information.component.css',
  providers: [NutritionalInformationService]
})
export class NutritionalInformationComponent implements OnInit {
  formData: any = {}
  currentStep: number = 1

  allergies: any[] = []
  diet: string = ''
  allergy: FormControl<string | null> = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
    Validators.maxLength(40)
  ])

  constructor (
    private nutritionalInformationService: NutritionalInformationService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
    this.getAllergies()
  }

  getAllergies(): void {
    this.nutritionalInformationService.getAllergies().subscribe({
      next: (response) => {this.allergies = response },
      error: (error) => {
        this.toastr.error('Error obteniendo las alergias', 'Error', {
          timeOut: 3000
        });
      }
    });
  }


  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  setDiet (value: any) {
    this.diet = value
    this.formData['diet'] = value
  }

  nextStep () {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++
      }
    } else if (this.currentStep === 2) {
      if (this.validateStep2()) {
        this.saveNutritionalInformationData()
      } else { this.allergy.markAllAsTouched() }
    }
  }

  backStep () {
    if (this.currentStep > 1) {
      this.currentStep--
    }
  }

  changeValueForm (e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  validateStep1 () {
    return this.diet !== ''
  }

  validateStep2 () {
    return !!this.allergy.value && this.allergy.errors === null
  }

  saveNutritionalInformationData () {
    this.nutritionalInformationService.updateInformation(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse () {
    this.toastr.success('Información nutricional guardado éxitosamente', 'Toastr fun!', {
      timeOut: 3000
    })
  }

  handleError () {
    let text = 'Error agregando la información nutricional'
    this.toastr.error(text, 'Error', {
      timeOut: 3000
    })
  }
}
