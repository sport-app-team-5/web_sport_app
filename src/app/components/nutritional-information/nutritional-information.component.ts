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

  allergies_to_show: any[] = []
  foodPreference: string = ''
  allergies: FormControl<number | null> = new FormControl(null, [Validators.required])

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
      next: (response) => {this.allergies_to_show = response },
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

  setFoodPreference (value: any) {
    this.foodPreference = value
    this.formData['foodPreference'] = value
  }

  nextStep () {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++
      }
    } else if (this.currentStep === 2) {
      if (this.validateStep2()) {
        this.saveNutritionalInformationData()
      } else { this.allergies.markAllAsTouched() }
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
    return this.foodPreference !== ''
  }

  validateStep2 () {
    return this.allergies.value && this.allergies.errors === null
  }

  saveNutritionalInformationData () {
    console.log(this.formData)
    this.nutritionalInformationService.createNutritionalInformation(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse () {
    this.toastr.success('Información nutricional guardado éxitosamente', 'Exitoso', {
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
