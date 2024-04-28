import {Component, OnInit} from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";
import {ReactiveFormsModule} from '@angular/forms'
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {NutritionalInformationService} from "./nutritional-information.service";
import {ToastrService} from "ngx-toastr";
import {NgMultiSelectDropDownModule,} from 'ng-multiselect-dropdown';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nutritional-information',
  standalone: true,
  imports: [NgForOf, NgIf, ReactiveFormsModule, TranslateModule, NgMultiSelectDropDownModule, HeaderMainComponent],
  templateUrl: './nutritional-information.component.html',
  styleUrl: './nutritional-information.component.css',
  providers: [NutritionalInformationService]
})
export class NutritionalInformationComponent implements OnInit {
  dropdownSettings = {
    idField: 'id',
    textField: 'name',
    enableCheckAll: false
  };
  formData: any = {}
  currentStep: number = 1
  activateErrorMessageForFoodPreference: boolean = false

  allergies_list: any[] = []
  foodPreference: string = ''
  allergies: Array<number> = [];
  validateAllergies: boolean = false

  constructor (
    private nutritionalInformationService: NutritionalInformationService,
    private toastr: ToastrService,
    private translate: TranslateService,
    private router: Router
   
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
    this.getAllergies()
  } 

  onItemSelect(item: any) {
    this.allergies.push(item.id);
    this.validateAllergies = false
  }

  onItemDeSelect(item: any) {
    this.allergies = this.allergies.filter((id) => id !== item.id);
  }

  getAllergies(): void {
    this.nutritionalInformationService.getAllergies().subscribe({
      next: (response) => {this.allergies_list = response },
      error: () => {
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
    this.formData['food_preference'] = value
    this.activateErrorMessageForFoodPreference = false
  }

  nextStep () {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++
      } else { this.activateErrorMessageForFoodPreference = true }
    } else if (this.currentStep === 2) {
      this.changeValueForm({target: {name: 'allergies', value: this.allergies}})
      if (this.validateStep2()) {
        this.saveNutritionalInformationData()
      } else { this.validateAllergies = true }
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
    return this.allergies.length > 0
  }

  saveNutritionalInformationData () {
    this.nutritionalInformationService.createNutritionalInformation(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse () {
    this.toastr.success('Información nutricional guardado éxitosamente', 'Exitoso', {
      timeOut: 3000
    })
    this.router.navigate(['/home']);
  
  }

  handleError () {
    let text = 'Error agregando la información nutricional'
    this.toastr.error(text, 'Error', {
      timeOut: 3000
    })
  }
}
