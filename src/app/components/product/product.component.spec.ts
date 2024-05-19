import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {of, throwError} from "rxjs";
import {ProductComponent} from "./product.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ProductService} from "./product.service";
import { By } from '@angular/platform-browser';
import { NutritionalInformationService } from '../nutritional-information/nutritional-information.service';

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

  it('should call backStep from food', () => {
    component.currentStep = 4
    component.category = 'Food1'
    component.backStep()
    expect(component.currentStep).toBe(1)
  })

  it('should call nextStep when currentstep is equal to 1', () => {
    component.currentStep = 1
    spyOn(component, 'validateStep1').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(4)
  })

  it('should call nextStep when currentstep is equal to 1 and category is food', () => {
    component.currentStep = 1
    component.category = 'Food'
    spyOn(component, 'validateStep1').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(2)
  })

  it('should call nextStep when currentstep is equal to 2', () => {
    component.currentStep = 2
    component.category = 'Food'
    component.categoryFood = 'Vegetales'
    spyOn(component, 'validateStep2Food').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(3)
  })

  it('should create step 2 valid data', () => {
    component.currentStep = 2
    component.category = 'Food'
    fixture.detectChanges()
    const buttonElement = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement.triggerEventHandler('click', null);
    const buttonElementMeal = fixture.debugElement.query(By.css('#meal'));
    buttonElementMeal.triggerEventHandler('click', null);
    const buttonElementLegumes = fixture.debugElement.query(By.css('#legumes'));
    buttonElementLegumes.triggerEventHandler('click', null);
    const buttonElementDairy = fixture.debugElement.query(By.css('#dairy'));
    buttonElementDairy.triggerEventHandler('click', null);
    const buttonElementBaked = fixture.debugElement.query(By.css('#baked'));
    buttonElementBaked.triggerEventHandler('click', null);
    const buttonElementVegetables = fixture.debugElement.query(By.css('#vegetables'));
    buttonElementVegetables.triggerEventHandler('click', null);

    const buttonElement1 = fixture.debugElement.query(By.css('#buttonNext'));
    buttonElement1.triggerEventHandler('click', null);
    fixture.detectChanges()
    expect(3).toEqual(component.currentStep);
    expect(component).toBeTruthy();
  });

  it('should call nextStep when currentstep is equal to 3', () => {
    component.currentStep = 3
    component.categoryFood = 3
    spyOn(component, 'validateStep3Allergies').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(4)
  })

  it('should call nextStep when currentstep is equal to 4', () => {
    component.currentStep = 4
    spyOn(component, 'validateStep4').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(5)
  })

  it('should call nextStep when currentstep is equal to 5', () => {
    component.currentStep = 5
    spyOn(component, 'validateStep5').and.returnValue(true)
    component.nextStep()
    expect(component.currentStep).toBe(6)
  })


  it('should call nextStep when currentstep is equal to 6', () => {
    component.currentStep = 6
    spyOn(component, 'validateStep6').and.returnValue(true)
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

  it('should call validateStep5 when cost is true', () => {
    const instance = {
      cost: new FormControl('value')
    }
    const result = component.validateStep5.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep5 when cost is false', () => {
    const errors = { someError: true }
    const instance = {
      cost: new FormControl('value')
    }
    instance.cost.setErrors(errors)
    const result = component.validateStep5.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep4 when name is filled and is throwed and error', () => {
    const errors = { someError: true }
    const instance = {
      name: new FormControl('value')
    }
    instance.name.setErrors(errors)
    const result = component.validateStep4.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep4 when name is filled', () => {
    const instance = {
      name: new FormControl('value')
    }

    const result = component.validateStep4.call(instance)
    expect(result).toEqual(true)
  })

  it('should call validateStep3 allergies', () => {
    component.allergies = ["1", "2", "3"]
    fixture.detectChanges()

    const result = component.validateStep3Allergies()
    expect(result).toEqual(true)
  })
  it('should call validateStep3 allergies  fail', () => {
    component.allergies = []
    fixture.detectChanges()


    const result = component.validateStep3Allergies()
    expect(result).toEqual(false)
  })

  it('should call validateStep5 when cost is false 1', () => {
    const errors = { someError: true }
    const instance = {
      cost: new FormControl('value')
    }
    instance.cost.setErrors(errors)
    const result = component.validateStep5.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep6 when description is true', () => {
    const instance = {
      description: new FormControl('value')
    }
    const result = component.validateStep6.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep6 when description is false', () => {
    const errors = { someError: true }
    const instance = {
      description: new FormControl('value')
    }
    instance.description.setErrors(errors)
    const result = component.validateStep6.call(instance)
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
    expect(router.navigate).toHaveBeenCalledWith(['/products-list'])
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

  it('should switch language', () => {
    spyOn(translateService, 'use');
    component.switchLanguage('en');
    expect(translateService.use).toHaveBeenCalledWith('en');
  });



  it('should handle error from getTrainings', () => {
    const productService = TestBed.inject(NutritionalInformationService);

    spyOn(productService, 'getAllergies').and.returnValue(throwError('Error'));
    component.ngOnInit();

    expect(productService.getAllergies).toHaveBeenCalled();
  });

  describe('select allergies', () => {
    it('should select allergies in formData', () => {
      component.onItemSelect({ name: "1" })

      expect(component.allergies).toEqual(["1"])
    })
  })

  describe('de-select allergies', () => {
    it('should de-select allergies in formData', () => {
      component.allergies = ["1", "2", "3"]
      component.onItemDeSelect({ name: "1" })

      expect(component.allergies).toEqual(["2", "3"])
    })
  })
})
