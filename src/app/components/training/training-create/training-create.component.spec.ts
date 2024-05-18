import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {of} from "rxjs";
import {TrainingCreateComponent} from "./training-create.component";
import {TrainingService} from "../training.service";
import {HttpLoaderFactory} from "../../../app.config";

describe('TrainingCreateComponent', () => {
  let component: TrainingCreateComponent
  let fixture: ComponentFixture<TrainingCreateComponent>
  let translateService: TranslateService
  let toastrService: ToastrService
  let exerciseService: TrainingService
  let duration: FormControl
  let description: FormControl
  let sport: FormControl
  let name: FormControl
  let router: Router

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        TrainingService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        TrainingCreateComponent,
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
    fixture = TestBed.createComponent(TrainingCreateComponent)
    component = fixture.componentInstance
    exerciseService = TestBed.inject(TrainingService)
    translateService = TestBed.inject(TranslateService)

    fixture.detectChanges()
    duration = new FormControl('', [Validators.required])
    name = new FormControl('', [Validators.required])
    sport = new FormControl('', [Validators.required])
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

  it('should call nextStep when currentstep is equal to 3', () => {
    component.currentStep = 3
    spyOn(component, 'validateStep3').and.returnValue(true)
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
    spyOn(component, 'saveTrainingData')

    component.nextStep()
    expect(component.currentStep).toBe(6)
  })

  it('should call validateStep4 when duration is true', () => {
    const instance = {
      duration: new FormControl('value')
    }
    const result = component.validateStep4.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep4 when duration is false 1', () => {
    const errors = { someError: true }
    const instance = {
      duration: new FormControl('value')
    }
    instance.duration.setErrors(errors)
    const result = component.validateStep4.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep4 when duration is false', () => {
    const errors = { someError: true }
    const instance = {
      duration: new FormControl('value')
    }
    instance.duration.setErrors(errors)
    const result = component.validateStep4.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep2 when description is true', () => {
    const instance = {
      description: new FormControl('value')
    }
    const result = component.validateStep2.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep2 when description is false', () => {
    const errors = { someError: true }
    const instance = {
      description: new FormControl('value')
    }
    instance.description.setErrors(errors)
    const result = component.validateStep2.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep1 when name is true', () => {
    const instance = {
      name: new FormControl('value')
    }
    const result = component.validateStep1.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep1 when name is false', () => {
    const errors = { someError: true }
    const instance = {
      name: new FormControl('value')
    }
    instance.name.setErrors(errors)
    const result = component.validateStep1.call(instance)
    expect(result).toEqual(false)
  })

  it('should call validateStep3 when sport is true', () => {
    const instance = {
      sport: new FormControl('value')
    }
    const result = component.validateStep3.call(instance)
    expect(result).toBe(true)
  })

  it('should call validateStep3 when sport is false', () => {
    const errors = { someError: true }
    const instance = {
      sport: new FormControl('value')
    }
    instance.sport.setErrors(errors)
    const result = component.validateStep3.call(instance)
    expect(result).toEqual(false)
  })

  it('should call saveTrainingData', () => {
    const mock = TestBed.inject(TrainingService)
    const response = [
      { id: '1', name: 'City1' },
      { id: '2', name: 'City2' }
    ]
    spyOn(mock, 'createTraining').and.returnValue(of(response))

    spyOn(component, 'handleUpdateResponse')
    component.saveTrainingData()
    expect(component).toBeTruthy()
  })

  it('should call handleUpdateResponse', () => {
    const response = {}
    component.handleUpdateResponse(response)
    expect(router.navigate).toHaveBeenCalledWith(['/home'])
  })

  it('should call handleError', () => {
    const toastrProduct = TestBed.inject(ToastrService)
    const errorText = 'Error registrando el entrenamiento'
    const spyError = spyOn(toastrProduct, 'error')
    component.handleError(errorText)

    expect(spyError).toHaveBeenCalledWith(errorText, 'Error', {
      timeOut: 3000
    })
  })
})
