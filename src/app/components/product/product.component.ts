import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";
import { NutritionalInformationService } from '../nutritional-information/nutritional-information.service';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, NgIf, TranslateModule, NgClass, ReactiveFormsModule, NgMultiSelectDropDownModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {

getButtonClassesVegetables(): any {
  return {
    'question-button': true,
    'active-button': this.categoryFood === 'Vegetales'
  }}

getButtonClassesBaked(): any {
  return {
    'question-button': true,
    'active-button': this.categoryFood === 'Productos Horneados'
  }}

getButtonClassesDairy(): any {
  return {
    'question-button': true,
    'active-button': this.categoryFood === 'Productos lácteos'
  }}

getButtonClassesLegumes(): any {
  return {
    'question-button': true,
    'active-button': this.categoryFood === 'Legumbres'
  }}

getButtonClassesMeal(): any {
  return {
    'question-button': true,
    'active-button': this.categoryFood === 'Aves de carne'
  }}

  currentStep: any = 1
  formData: any = {}

  category: any = null
  categoryFood: any = null
  cost: FormControl = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  description: FormControl = new FormControl('', [Validators.required])
  activateErrorMessageForCategory: boolean = false
  activateErrorMessageForCategoryFood: boolean = false

  allergies_list: any[] = []
  foodPreference: string = ''
  allergies: Array<string> = [];
  validateAllergies: boolean = false
  language: string = 'es';


  dropdownSettings = {
    idField: 'id',
    textField: 'name',
    enableCheckAll: false
  };

  constructor (
    private toastr: ToastrService,
    private translate: TranslateService,
    private productService: ProductService,
    private router: Router,
    private nutritionalInformationService: NutritionalInformationService,
  ) {}

  ngOnInit () {
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
    this.getAllergies()
  }

  onItemSelect(item: any) {
    this.allergies.push(item.name);
    this.validateAllergies = false
  }

  onItemDeSelect(item: any) {
    this.allergies = this.allergies.filter((name) => name !== item.name);
  }

  getButtonClassesSupplements() {
    return {
      'question-button': true,
      'active-button': this.category === 'Supplements'
    }
  }

  getButtonClassesSportsEquipment() {
    return {
      'question-button': true,
      'active-button': this.category === 'Sports Equipment'
    }
  }

  getButtonClassesFood() {
    return {
      'question-button': true,
      'active-button': this.category === 'Food'
    }
  }

  changeValueForm (e: any) {
    const name = e.target.name
    this.formData[name] = e.target.value
  }

  switchLanguage (language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  setCategory (value: any) {
    this.category = value
    this.formData['category'] = value
    this.activateErrorMessageForCategory = false
  }

  setCategoryFood (value: any) {
    this.categoryFood = value
    this.formData['category_food'] = value
    this.activateErrorMessageForCategoryFood = false
  }

  backStep () {
    if (this.currentStep > 1) {
      if (this.currentStep === 4  && this.category != 'Food') {
        this.currentStep = 1;
      } else {
        this.currentStep--
      }

    }
  }

  nextStep () {

    switch (this.currentStep) {
      case 1:
        this.handleStep1();
        break;
      case 2:
        this.handleStep2();
        break;
      case 3:
        this.handleStep3();
        break;
      case 4:
        this.handleStep4();
        break;
      case 5:
        this.handleStep5();
        break;
      case 6:
        this.handleStep6();
        break;
    }
  }

  private handleStep1() {
    if (this.validateStep1()) {
      if (this.category == 'Food') {
        this.currentStep++;
      } else {
        this.currentStep = 4;
      }
    }
  }

  private handleStep2() {
    if (this.validateStep2Food() ) {
      this.currentStep++;
    }
  }

  private handleStep3() {
    this.changeValueForm({target: {name: 'allergies', value: this.allergies.join(',')}})
    if (this.validateStep3Allergies()) {
      this.currentStep++;
    }
  }

  private handleStep4() {
    if (this.validateStep4()) {
      this.currentStep++;
    }
  }

  private handleStep5() {
    if (this.validateStep5()) {
      this.currentStep++;
    }
  }

  private handleStep6() {
    if (this.validateStep6()) {
      this.saveProductData();
    }
  }


  validateStep1 () {
    if (this.category) {
      return true
    } else {
      this.activateErrorMessageForCategory = true
      return false
    }
  }

  validateStep2Food () {
    if (this.categoryFood) {
      return true
    } else {
      this.activateErrorMessageForCategoryFood = true
      return false
    }
  }

  validateStep3Allergies() {
    let result = false
    if (this.allergies.length > 0) {
      this.validateAllergies = false
      result = true
    }else{
      this.validateAllergies = true
    }
    return result

  }

  validateStep4 () {
    if (this.name && this.name.errors === null) {
      return true
    } else {
      this.name.markAsTouched()
      return false
    }
  }

  validateStep5 () {
    if (this.cost && this.cost.errors === null) {
      return true
    } else {
      this.cost.markAsTouched()
      return false
    }
  }

  validateStep6 () {
    if (this.description && this.description.errors === null) {
      return true
    } else {
      this.description.markAsTouched()
      return false
    }
  }

  saveProductData () {
    this.productService.createProduct(this.formData).subscribe({
      next: this.handleUpdateResponse.bind(this),
      complete: this.cleanData.bind(this),
      error: this.handleError.bind(this)
    })

  }

  cleanData(){
    this.formData = {}
    this.category = null
    this.categoryFood = null
    this.cost = new FormControl('', [Validators.required])
    this.name = new FormControl('', [Validators.required])
    this.description = new FormControl('', [Validators.required])
    this.activateErrorMessageForCategory = false
    this.activateErrorMessageForCategoryFood = false
    this.allergies = []
    this.foodPreference = ''
    this.validateAllergies = false
  }

  handleUpdateResponse (response: any) {
    this.toastr.success('Registro exitoso del producto', 'Exito', {
      timeOut: 3000
    })
    this.router.navigate(['/products-list'])
  }

  handleError (error: any) {
    this.toastr.error('Error registrando el producto', 'Error', {
      timeOut: 3000
    })
  }

  getAllergies(): void {
    let token=null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token');
    }
    this.nutritionalInformationService.getAllergies(token).subscribe({
      next: (response) => {this.allergies_list = response },
      error: (err) => {
        this.toastr.error('Error obteniendo las alergias', 'Error', {
          timeOut: 3000
        });
      }
    });
  }
}
