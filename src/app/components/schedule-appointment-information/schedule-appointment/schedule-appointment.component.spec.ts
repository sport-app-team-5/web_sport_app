import { ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {ScheduleAppointmentComponent} from "./schedule-appointment.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ScheduleAppointmentService} from "../schedule-appointment.service";
import { of } from 'rxjs';

describe('ScheduleAppointmentComponent', () => {
  let component: ScheduleAppointmentComponent
  let fixture: ComponentFixture<ScheduleAppointmentComponent>
  let translateService: TranslateService
  let toastrService: ToastrService
  let scheduleAppointmentService: ScheduleAppointmentService
  let router: Router
  let service: FormControl;
  let injury: FormControl;
  let sport: FormControl;
  let datetimecustom: FormControl;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ScheduleAppointmentService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        ScheduleAppointmentComponent,
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
  })

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleAppointmentComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should set the default language to "es" if localStorage is not available', () => {
    const mockLanguage = 'en';
    spyOn(localStorage, 'getItem').and.returnValue(mockLanguage);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith(mockLanguage);
    expect(component.language).toEqual(mockLanguage);
  });

  it('should set the default language to the value stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('en');
    component.ngOnInit();
    spyOn(component.translate, 'setDefaultLang');
    expect(component.language).toBe('en');
  });

  it('should validate step 1', () => {
    component.sport.setValue('Basketball');
    expect(component.validateStep1()).toBeTrue();
  });

  it('should validate step 2', () => {
    component.service.setValue('Physiotherapy');
    expect(component.validateStep2()).toBeTrue();
  });

  it('should validate step 3', () => {
    component.injury.setValue('Sprained ankle');
    expect(component.validateStep3()).toBeTrue();
  });

  it('should go back one step', () => {
    component.currentStep = 2;
    component.backStep();
    expect(component.currentStep).toEqual(1);
  });

  it('should go to the next step', () => {
    component.currentStep = 1;
    component.nextStep();
    expect(component.currentStep).toEqual(1);
  });

  it('should validate step 4', () => {
    component.datetimecustom.setValue('2022-12-31T23:59');
    expect(component.validateStep4()).toBeTrue();
  });

  it('should validate an invalid date', () => {
    const invalidDate = 'Invalid Date';
    component.datetimecustom.setValue(invalidDate);
    expect(component.validateDate(component.datetimecustom)).toEqual({ fechaInvalida: true });
  });

  it('should return null if the date is valid', () => {
    const validDate = '2022-12-31T23:59';
    const result = component.validateDate({ value: validDate });
    expect(result).toBeNull();
  });

  it('should return { fechaInvalida: true } if the date is invalid', () => {
    const invalidDate = 'Invalid Date';
    const result = component.validateDate({ value: invalidDate });
    expect(result).toEqual({ fechaInvalida: true });
  });

  it('should get the default value for datetimecustom', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 2);
    const expectedValue = tomorrow.toISOString().slice(0, 16);
    expect(component.getDefaultValue()).toEqual(expectedValue);
  });

  it('should get the min value for datetimecustom', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const expectedValue = tomorrow.toISOString().slice(0, 16);
    expect(component.getMinValue()).toEqual(expectedValue);
  });

  it('should get the max value for datetimecustom', () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 365);
    const expectedValue = tomorrow.toISOString().slice(0, 16);
    expect(component.getMaxValue()).toEqual(expectedValue);
  });

  it('should set the appointment date', () => {
    const appointmentDate = '2022-12-31T23:59';
    component.datetimecustom.setValue(appointmentDate);
    component.setAppointmentDate();
    expect(component.formData['appointment_date']).toEqual(appointmentDate);
    expect(component.activateErrorMessageForCategory).toBeFalse();
  });

  it('should set the appointment date', () => {
    const appointmentDate = '2022-12-31T23:59';
    component.datetimecustom.setValue(appointmentDate);
    component.setAppointmentDate();
    expect(component.formData['appointment_date']).toEqual(appointmentDate);
    expect(component.activateErrorMessageForCategory).toBeFalse();
  });

  it('should update the form data when a value is changed', () => {
    const event = { target: { name: 'sport', value: 'Basketball' } };
    component.changeValueForm(event);
    expect(component.formData['sport']).toEqual('Basketball');
  });

  it('should get injuries', () => {
    component.getInjuries();
    expect(component.injuries.length).toBeGreaterThan(0);
  });

  it('should clean the form data and reset form controls', () => {
    component.formData = {
      appointment_date: '2022-12-31T23:59',
      sportman_id: '12345'
    };
    component.sport.setValue('Basketball');
    component.service.setValue('Physiotherapy');
    component.injury.setValue('Sprained ankle');
    component.datetimecustom.setValue('2022-12-31T23:59');
    component.activateErrorMessageForCategory = true;

    component.cleanData();

    expect(component.formData).toEqual({});
    expect(component.sport.value).toBe('');
    expect(component.service.value).toBe('');
    expect(component.injury.value).toBe('');
    expect(component.datetimecustom.value).toBe('');
    expect(component.activateErrorMessageForCategory).toBe(false);
  });

  it('should initialize variables correctly', () => {
    expect(component.formData).toEqual({});
    expect(component.currentStep).toEqual(1);
    expect(component.service).toBeInstanceOf(FormControl);
    expect(component.injury).toBeInstanceOf(FormControl);
    expect(component.sport).toBeInstanceOf(FormControl);
    expect(component.datetimecustom).toBeInstanceOf(FormControl);
    expect(component.activateErrorMessageForCategory).toBeFalse();
    expect(component.sportSpecialist).toEqual([]);
    expect(component.sportSelected).toBe('');
    expect(component.injuries).toBeTruthy();
    expect(component.appoinmentDate).toBe('');
  });

});

