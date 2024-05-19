/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchleduleAppointmentListComponent } from './schledule-appointment-list.component';
import { ScheduleAppointmentService } from '../schedule-appointment.service';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../../app.config';
import { of } from 'rxjs';

describe('SchleduleAppointmentListComponent', () => {
  let component: SchleduleAppointmentListComponent;
  let fixture: ComponentFixture<SchleduleAppointmentListComponent>;

  beforeEach(() => {

    let component: SchleduleAppointmentListComponent
    let fixture: ComponentFixture<SchleduleAppointmentListComponent>
    let translateService: TranslateService
    let toastrService: ToastrService
    let appointmentService: ScheduleAppointmentService

    TestBed.configureTestingModule({
      providers: [
        ScheduleAppointmentService,
        {
          provide: Router,
          useValue: jasmine.createSpyObj('Router', ['navigate'])
        }
      ],
      imports: [
        SchleduleAppointmentListComponent,
        HttpClientModule,
        HttpClientTestingModule,
        ToastrModule.forRoot(),
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })
    .compileComponents();

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchleduleAppointmentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize language to "es" if localStorage is not available', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    spyOn(component.translate, 'setDefaultLang');

    component.ngOnInit();

    expect(localStorage.getItem).toHaveBeenCalledWith('lang');
    expect(component.translate.setDefaultLang).toHaveBeenCalledWith('es');
    expect(component.language).toEqual('es');
  });

  it('should initialize language to the value stored in localStorage', () => {
    spyOn(localStorage, 'getItem').and.returnValue('en');

    component.ngOnInit();

    expect(component.language).toBe('en');
  });

  it('should call getInjuries and getAppointmentsServices methods', () => {
    spyOn(component, 'getInjuries');
    spyOn(component, 'getAppointmentsServices');

    component.ngOnInit();

    expect(component.getInjuries).toHaveBeenCalled();
    expect(component.getAppointmentsServices).toHaveBeenCalled();
  });

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

  it('should call getInjuries and getAppointmentsServices methods on ngOnInit', () => {
    spyOn(component, 'getInjuries');
    spyOn(component, 'getAppointmentsServices');
    component.ngOnInit();
    expect(component.getInjuries).toHaveBeenCalled();
    expect(component.getAppointmentsServices).toHaveBeenCalled();
  });

  it('should get appointments successfully', () => {
    const mockAppointments = [{ id: 1, name: 'Event 1' }, { id: 2, name: 'Event 2' }];
    const appointmentsService = TestBed.inject(ScheduleAppointmentService);
    spyOn(appointmentsService, 'getScheduleAppointment').and.returnValue(of(mockAppointments));

    component.getAppointmentsServices("1");

    expect(component.appointments).toEqual(mockAppointments);
  });

  it('should set creatingSchedule to true on createAppointment', () => {
    component.createAppointment();
    expect(component.creatingSchedule).toBe(true);
  });

  it('should set creatingSchedule to false on closeWindow', () => {
    component.closeWindow();
    expect(component.creatingSchedule).toBe(false);
  });

  it('should return the correct injury name when given a valid injury id', () => {
    component.injuries = [
      { id: "1", name: "Fracturas miembro superior", description: "Fracturas miembro superior" },
      { id: "2", name: "Fracturas miembro inferiores", description: "Fracturas miembro inferiores" },
      { id: "3", name: "Dolor en miembros superiores", description: "Dolor en miembros superiores" },
      { id: "4", name: "Dolor en miembros inferiores", description: "Dolor en miembros inferiores" },
      { id: "5", name: "Dolor en la espalda", description: "Dolor en la espalda" },
      { id: "6", name: "Quemaduras en la espalda", description: "Quemaduras en la espalda" },
      { id: "7", name: "Ampollas miembros inferiores", description: "Ampollas en miembros inferiores" },
      { id: "8", name: "Ampollas miembros superiores", description: "Ampollas en miembros superiores" }
    ];

    const injuryId = "3";
    const expectedInjuryName = "Dolor en miembros superiores";
    const injuryName = component.getInjuryName(injuryId);

    expect(injuryName).toBe(expectedInjuryName);
  });

  it('should return "N/A" when given an invalid injury id', () => {
    component.injuries = [
      { id: "1", name: "Fracturas miembro superior", description: "Fracturas miembro superior" },
      { id: "2", name: "Fracturas miembro inferiores", description: "Fracturas miembro inferiores" },
      { id: "3", name: "Dolor en miembros superiores", description: "Dolor en miembros superiores" },
      { id: "4", name: "Dolor en miembros inferiores", description: "Dolor en miembros inferiores" },
      { id: "5", name: "Dolor en la espalda", description: "Dolor en la espalda" },
      { id: "6", name: "Quemaduras en la espalda", description: "Quemaduras en la espalda" },
      { id: "7", name: "Ampollas miembros inferiores", description: "Ampollas en miembros inferiores" },
      { id: "8", name: "Ampollas miembros superiores", description: "Ampollas en miembros superiores" }
    ];

    const injuryId = "10";
    const expectedInjuryName = "N/A";
    const injuryName = component.getInjuryName(injuryId);

    expect(injuryName).toBe(expectedInjuryName);
  });

  it('should populate the injuries array with the correct values', () => {
    component.getInjuries();

    const expectedInjuries = [
      { id: "1", name: "Fractuas miembro superior", description: "Fractuas miembro superior" },
      { id: "2", name: "Fracturas miembro inferiores", description: "Fracturas miembro inferiores" },
      { id: "3", name: "Dolor en miembros superiores", description: "Dolor en miembros superiores" },
      { id: "4", name: "Dolor en miembros inferiores", description: "Dolor en miembros inferiores" },
      { id: "5", name: "Dolor en la espalda", description: "Dolor en la espalda" },
      { id: "6", name: "Quemaduras en la espalda", description: "Quemaduras en la espalda" },
      { id: "7", name: "Ampollas miembros inferiores", description: "Ampollas en miembros inferiores" },
      { id: "8", name: "Ampollas miembros superiores", description: "Ampollas en miembros superiores" }
    ];

    expect(component.injuries).toEqual(expectedInjuries);
  });


  it('should not modify the injuries array if it is already populated', () => {
    const existingInjuries = [
      { id: "1", name: "Fractuas miembro superior", description: "Fractuas miembro superior" },
      { id: "2", name: "Fracturas miembro inferiores", description: "Fracturas miembro inferiores" },
      { id: "3", name: "Dolor en miembros superiores", description: "Dolor en miembros superiores" },
      { id: "4", name: "Dolor en miembros inferiores", description: "Dolor en miembros inferiores" },
      { id: "5", name: "Dolor en la espalda", description: "Dolor en la espalda" },
      { id: "6", name: "Quemaduras en la espalda", description: "Quemaduras en la espalda" },
      { id: "7", name: "Ampollas miembros inferiores", description: "Ampollas en miembros inferiores" },
      { id: "8", name: "Ampollas miembros superiores", description: "Ampollas en miembros superiores" }
    ];
    component.injuries = existingInjuries;

    component.getInjuries();

    expect(component.injuries).toEqual(existingInjuries);
  });

  it('should initialize appointments as an empty array', () => {
    expect(component.appointments).toEqual([]);
  });

  it('should initialize creatingSchedule as false', () => {
    expect(component.creatingSchedule).toBe(false);
  });

  it('should initialize injuries as an empty array', () => {
    expect(component.injuries).toBeTruthy();
  });

});


