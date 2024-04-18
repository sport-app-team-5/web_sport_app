import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {of} from "rxjs";
import {ProductComponent} from "./product.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProductService} from "./product.service";

describe('ProductComponent', () => {
  let component: ProductComponent
  let fixture: ComponentFixture<ProductComponent>
  let translateService: TranslateService
  let toastrService: ToastrService
  let productService: ProductService
  let cost: FormControl
  let description: FormControl
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        ProductComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        FormsModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    }).compileComponents()
  }))

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductComponent)
    component = fixture.componentInstance
    productService = TestBed.inject(ProductService)
    translateService = TestBed.inject(TranslateService)

    fixture.detectChanges()
    cost = new FormControl('', [Validators.required])
    description = new FormControl('', [Validators.required])
    router = TestBed.inject(Router)
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the value in formData', () => {
    const event = { target: { name: 'test', value: 'value' } }
    component.changeValueForm(event)
    expect(component.formData['test']).toBe('value')
  })

  it('should set the value in setProductType', () => {
    const value = 'test'
    component.setCategory(value)
    expect(component.formData['category']).toBe('test')
  })

  it('should call backStep', () => {
    component.currentStep = 2
    component.backStep()
    expect(component.currentStep).toBe(1)
  })

  it('should call nextStep when currentstep is equal to 1', () => {
    component.currentStep = 1
    spyOn(component, 'validateStep1').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(2)
  })

  it('should call nextStep when currentstep is equal to 2', () => {
    component.currentStep = 2
    spyOn(component, 'validateStep2').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(3)
  })

  it('should call nextStep when currentstep is equal to 4', () => {
    component.currentStep = 4
    spyOn(component, 'validateStep4').and.returnValue(true)
    spyOn(component, 'saveProductData')

    component.nextStep()
    expect(component.saveProductData).toHaveBeenCalled()
  })

  it('should call validateStep1 when category is tru', () => {
    component.category = true
    component.validateStep1()
    expect(component.validateStep1()).toBe(true)
  })

  it('should call validateStep1 when category is false', () => {
    component.category = false
    component.validateStep1()
    expect(component.validateStep1()).toBe(false)
  })

  it('should call validateStep3 when cost is true', () => {
    const instance = {
      cost: new FormControl('value')
    }
    const result = component.validateStep3.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep3 when cost is false', () => {
    const errors = { someError: true }
    const instance = {
      cost: new FormControl('value')
    }
    instance.cost.setErrors(errors)
    const result = component.validateStep3.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep3 when cost is false', () => {
    const errors = { someError: true }
    const instance = {
      cost: new FormControl('value')
    }
    instance.cost.setErrors(errors)
    const result = component.validateStep3.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep4 when description is true', () => {
    const instance = {
      description: new FormControl('value')
    }
    const result = component.validateStep4.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep4 when description is false', () => {
    const errors = { someError: true }
    const instance = {
      description: new FormControl('value')
    }
    instance.description.setErrors(errors)
    const result = component.validateStep4.call(instance)
    expect(result).toEqual(false)
  })


  it('should call saveProductData', () => {
    const mock = TestBed.inject(ProductService)
    const response = [
      { id: '1', name: 'City1' },
      { id: '2', name: 'City2' }
    ]
    spyOn(mock, 'createProduct').and.returnValue(of(response))

    spyOn(component, 'handleUpdateResponse')
    component.saveProductData()
    expect(component).toBeTruthy()
  })

  it('should call handleUpdateResponse', () => {
    const response = {}
    component.handleUpdateResponse(response)
    expect(router.navigate).toHaveBeenCalledWith(['/home'])
  })

  it('should call handleError', () => {
    const toastrProduct = TestBed.inject(ToastrService)
    const errorText = 'Error registrando el producto'
    const spyError = spyOn(toastrProduct, 'error')
    component.handleError(errorText)

    expect(spyError).toHaveBeenCalledWith(errorText, 'Error', {
      timeOut: 3000
    })
  })
})