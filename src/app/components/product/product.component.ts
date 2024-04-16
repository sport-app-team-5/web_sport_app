import {Component, OnInit} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgClass, NgIf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {ProductService} from "./product.service";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [FormsModule, NgIf, TranslateModule, NgClass, ReactiveFormsModule],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit {
  currentStep: any = 1
  formData: any = {}

  category: any = null
  cost: FormControl = new FormControl('', [Validators.required])
  name: FormControl = new FormControl('', [Validators.required])
  description: FormControl = new FormControl('', [Validators.required])
  activateErrorMessageForCategory: boolean = false

  constructor (
    private toastr: ToastrService,
    private translate: TranslateService,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
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
    this.translate.use(language)
  }

  setCategory (value: any) {
    this.category = value
    this.formData['category'] = value
    this.activateErrorMessageForCategory = false
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
        this.saveProductData()
      }
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

  validateStep2 () {
    if (this.name && this.name.errors === null) {
      return true
    } else {
      this.name.markAsTouched()
      return false
    }
  }

  validateStep3 () {
    if (this.cost && this.cost.errors === null) {
      return true
    } else {
      this.cost.markAsTouched()
      return false
    }
  }

  validateStep4 () {
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
      error: this.handleError.bind(this)
    })
  }

  handleUpdateResponse (response: any) {
    this.toastr.success('Registro exitoso del producto', 'Exito', {
      timeOut: 3000
    })
    this.router.navigate(['/home'])
  }

  handleError (error: any) {
    this.toastr.error('Error registrando el producto', 'Error', {
      timeOut: 3000
    })
  }
}
