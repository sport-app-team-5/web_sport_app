/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'
import { AdditionalserviceComponent } from './additionalservice.component'
import { AdditionalServiceService } from './additional-service.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core'
import { HttpClientTestingModule } from '@angular/common/http/testing'
import { HttpLoaderFactory } from '../../app.config'
import {
    FormControl,
    FormsModule,
    ReactiveFormsModule,
    Validators
} from '@angular/forms'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { of } from 'rxjs'
import { Router } from '@angular/router'

describe('AdditionalserviceComponent', () => {
    let component: AdditionalserviceComponent
    let fixture: ComponentFixture<AdditionalserviceComponent>
    let translateService: TranslateService
    let toastrService: ToastrService
    let additionalServiceService: AdditionalServiceService
    let cost: FormControl
    let description: FormControl
    let router: Router

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                AdditionalServiceService,
                {
                    provide: Router,
                    useValue: jasmine.createSpyObj('Router', ['navigate'])
                }
            ],
            imports: [
                AdditionalserviceComponent,
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
        fixture = TestBed.createComponent(AdditionalserviceComponent)
        component = fixture.componentInstance
        additionalServiceService = TestBed.inject(AdditionalServiceService)
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

    it('should set the value in setServiceType', () => {
        const value = 'test'
        component.setServiceType(value)
        expect(component.formData['type']).toBe('test')
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
        spyOn(component, 'saveServiceData')

        component.nextStep()
        expect(component.saveServiceData).toHaveBeenCalled()
    })

    it('should call validateStep1', () => {
        component.type = 'some'
        component.validateStep1()
        expect(component.validateStep1()).toBe('some')
    })

    it('should call validateStep2', () => {
        cost.setValue('some value')
        component.validateStep2()
        expect(cost.valid).toBeTruthy()
        expect(cost.errors).toBeNull()
    })

    it('should call validateStep3', () => {
        description.setValue('some value')
        component.validateStep3()
        expect(description.valid).toBeTruthy()
        expect(description.errors).toBeNull()
    })

    it('should call saveServiceData', () => {
        const mock = TestBed.inject(AdditionalServiceService)
        const response = [
            { id: '1', name: 'City1' },
            { id: '2', name: 'City2' }
        ]
        spyOn(mock, 'registerAdditionalService').and.returnValue(of(response))

        spyOn(component, 'handleUpdateResponse')
        component.saveServiceData()
        expect(component).toBeTruthy()
    })

    it('should call handleUpdateResponse', () => {
        const response = {}
        component.handleUpdateResponse(response)
        expect(router.navigate).toHaveBeenCalledWith(['/home'])
    })

    it('should call handleError', () => {       
        const toastrService = TestBed.inject(ToastrService)
        const errorText = 'Error registrando el servicio'
        const spyError = spyOn(toastrService, 'error')
        component.handleError(errorText)

        expect(spyError).toHaveBeenCalledWith(errorText, 'Error', {
            timeOut: 3000
        })
    })
})
