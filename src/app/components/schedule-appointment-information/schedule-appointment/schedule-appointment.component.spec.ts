import { ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../../app.config";
import {ScheduleAppointmentComponent} from "./schedule-appointment.component";
import {ToastrModule, ToastrService} from "ngx-toastr";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {ScheduleAppointmentService} from "../schedule-appointment.service";

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
    scheduleAppointmentService = TestBed.inject(ScheduleAppointmentService)
    translateService = TestBed.inject(TranslateService)

    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
  it('should initialize the form controls', () => {
    expect(component.service).toBeDefined();
    expect(component.injury).toBeDefined();
    expect(component.sport).toBeDefined();
    expect(component.datetimecustom).toBeDefined();
  });

  it('should navigate to a different route when backStep is called', () => {
    component.backStep();
    expect(router.navigate).toHaveBeenCalledWith(['your-route']);
  });

  it('should navigate to a different route when nextStep is called', () => {
    component.nextStep();
    expect(router.navigate).toHaveBeenCalledWith(['your-route']);
  });

  it('should validate step 1', () => {
    component.validateStep1();
    expect(component.activateErrorMessageForCategory).toBe(true);
  });

  it('should validate step 2', () => {
    component.validateStep2();
    expect(component.activateErrorMessageForCategory).toBe(true);
  });

  it('should validate step 3', () => {
    component.validateStep3();
    expect(component.activateErrorMessageForCategory).toBe(true);
  });

  it('should validate step 4', () => {
    component.validateStep4();
    expect(component.activateErrorMessageForCategory).toBe(true);
  });

  it('should validate the date', () => {
    const control = { value: '2022-01-01' };
    const result = component.validateDate(control);
    expect(result).toBeNull();
  });

  it('should get the default value', () => {
    const defaultValue = component.getDefaultValue();
    expect(defaultValue).toBeDefined();
  });

  it('should get the min value', () => {
    const minValue = component.getMinValue();
    expect(minValue).toBeDefined();
  });

  it('should get the max value', () => {
    const maxValue = component.getMaxValue();
    expect(maxValue).toBeDefined();
  });

  it('should change the value of the form', () => {
    const event = { target: { value: 'new value' } };
    component.changeValueForm(event);
    expect(component.formData).toEqual({ value: 'new value' });
  });

  it('should set the appointment date', () => {
    component.setAppointmentDate();
    expect(component.appoinmentDate).toBeDefined();
  });

  it('should save the appointment data', () => {
    component.saveAppointmentData();
    expect(component.saveAppointmentData).toHaveBeenCalled();
  });

  it('should clean the data', () => {
    component.cleanData();
    expect(component.formData).toEqual({});
  });

  it('should handle the update response', () => {
    const response = { success: true };
    component.handleUpdateResponse(response);
    expect(toastrService.success).toHaveBeenCalled();
  });

  it('should handle the error', () => {
    const error = { message: 'Error message' };
    component.handleError(error);
    expect(toastrService.error).toHaveBeenCalled();
  });

  it('should get the injuries', () => {
    component.getInjuries();
    expect(component.getInjuries).toHaveBeenCalled();
  });

  it('should get the sport specialist services', () => {
    component.getSportSpecialistServices();
    expect(component.getSportSpecialistServices).toHaveBeenCalled();
  });

  // it('should handle the get appointments response', () => {
  //   const response = { appointments: [] };
  //   component.handleGetAppointmentsResponse(response);
  //   expect(component.ap).toEqual([]);
  // });

  it('should handle the get appointment error', () => {
    const error = { message: 'Error message' };
    component.handleGetAppointmentError(error);
    expect(toastrService.error).toHaveBeenCalled();
  });

})
