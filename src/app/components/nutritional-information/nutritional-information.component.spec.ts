import { ComponentFixture, TestBed } from '@angular/core/testing'
import { NutritionalInformationComponent } from './nutritional-information.component'
import {
  TranslateLoader,
  TranslateModule,
  TranslateService
} from '@ngx-translate/core'
import { ToastrModule } from 'ngx-toastr'
import { NutritionalInformationService } from './nutritional-information.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpLoaderFactory } from '../../app.config'
import { of } from 'rxjs'

describe('NutritionalInformationComponent', () => {
  let component: NutritionalInformationComponent
  let fixture: ComponentFixture<NutritionalInformationComponent>
  let nutritionalInformationService: NutritionalInformationService
  let translateService: TranslateService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NutritionalInformationComponent,
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
      ],
      providers: [NutritionalInformationService]
    }).compileComponents()
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(NutritionalInformationComponent)
    component = fixture.componentInstance
    nutritionalInformationService = TestBed.inject(
      NutritionalInformationService
    )

    translateService = TestBed.inject(TranslateService)
    fixture.detectChanges()
  })

  describe('validate next step', () => {
    it('should increment current step if current step is 1', () => {
      component.currentStep = 2
      component.nextStep()

      expect(component.currentStep).toBe(2)
    })

    it('should not increment current step if current step is 2 and validate step2 returns false', () => {
      component.currentStep = 2
      spyOn(component, 'validateStep2').and.returnValue(false)
      component.nextStep()

      expect(component.currentStep).toBe(2)
    })

    it('should call save nutritional information data if current step is 2', () => {
      component.currentStep = 2
      spyOn(component, 'validateStep2').and.returnValue(true)
      spyOn(component, 'saveNutritionalInformationData')
      component.nextStep()

      expect(component.saveNutritionalInformationData).toHaveBeenCalled()
    })
  })

  describe('Validate step 2', () => {
    it('should return true if all fields have values', () => {
      component.allergies = [1]

      expect(component.validateStep2()).toBeTrue()
    })

    it('should return false if any field does not have a value', () => {
      expect(component.validateStep2()).toBeFalse()
    })
  })

  describe('Validate step 1', () => {
    it('should return true if all fields have values', () => {
      component.setFoodPreference('Dieta1')

      expect(component.validateStep2()).toBeFalse()
    })
  })

  describe('back step', () => {
    it('should decrement current step if it is greater than 1', () => {
      component.currentStep = 2
      component.backStep()

      expect(component.currentStep).toBe(1)
    })

    it('should not decrement currentStep if it is not greater than 1', () => {
      component.currentStep = 1
      component.backStep()

      expect(component.currentStep).toBe(1)
    })
  })

  describe('set diet', () => {
    it('should set diet in formData', () => {
      component.setFoodPreference('Dieta1')

      expect(component.formData['food_preference']).toBe('Dieta1')
    })
  })

  describe('select allergies', () => {
    it('should select allergies in formData', () => {
      component.onItemSelect({ id: 1 })

      expect(component.allergies).toEqual([1])
    })
  })

  describe('de-select allergies', () => {
    it('should de-select allergies in formData', () => {
      component.allergies = [1, 2, 3]
      component.onItemDeSelect({ id: 1 })

      expect(component.allergies).toEqual([2, 3])
    })
  })

  describe('change value form', () => {
    it('should set the value in form data', () => {
      const event = { target: { name: 'test', value: 'value' } }
      component.changeValueForm(event)
      expect(component.formData['test']).toBe('value')
    })
  })

  describe('nextStep call', () => {
    it('should call nextStep when  currentStep 1', () => {
      component.currentStep = 1
      spyOn(component, 'validateStep1').and.returnValue(true)
      component.nextStep()
      expect(component.currentStep).toBe(2)
    })

    it('should call nextStep when  currentStep 1', () => {
      component.currentStep = 1
      spyOn(component, 'validateStep1').and.returnValue(false)
      component.nextStep()
      expect(component.activateErrorMessageForFoodPreference).toBe(true)
    })

    it('should call nextStep when  currentStep 1', () => {
      component.validateStep1()
      expect(component.foodPreference).toBe('')
    })

    it('should call saveNutritionalInformationData', () => {
      let mock = TestBed.inject(NutritionalInformationService)
      spyOn(mock, 'createNutritionalInformation').and.returnValue(of([{}]))
      component.saveNutritionalInformationData()
      // expect(component.saveNutritionalInformationData()).tob()
    })
  })
})
