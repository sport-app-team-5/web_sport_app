/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SchleduleAppointmentListComponent } from './schledule-appointment-list.component';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { ScheduleAppointmentService } from '../schedule-appointment.service';
import { Router } from '@angular/router';

describe('SchleduleAppointmentListComponent', () => {
  let component: SchleduleAppointmentListComponent;
  let fixture: ComponentFixture<SchleduleAppointmentListComponent>;
  let translateService: TranslateService
  let toastrService: ToastrService
  let scheduleAppointmentService: ScheduleAppointmentService
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ SchleduleAppointmentListComponent ]
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

  it('should initialize appointments array', () => {
    expect(component.appointments).toEqual([]);
  });

  it('should initialize language to "es"', () => {
    expect(component.language).toEqual('es');
  });

  it('should initialize creatingSchedule to false', () => {
    expect(component.creatingSchedule).toBeFalse();
  });

  it('should initialize injuries array', () => {
    expect(component.injuries).toEqual([]);
  });

  it('should call getAppointmentsServices method on ngOnInit', () => {
    spyOn(component, 'getAppointmentsServices');
    component.ngOnInit();
    expect(component.getAppointmentsServices).toHaveBeenCalled();
  });

  it('should call setFormatDate method with the provided value', () => {
    const value = '2022-01-01';
    spyOn(component, 'setFormatDate');
    component.setFormatDate(value);
    expect(component.setFormatDate).toHaveBeenCalledWith(value);
  });

  it('should call getInjuryName method with the provided injury_id', () => {
    const injury_id = '123';
    spyOn(component, 'getInjuryName');
    component.getInjuryName(injury_id);
    expect(component.getInjuryName).toHaveBeenCalledWith(injury_id);
  });

  it('should handle successful response from getAppointmentsServices', () => {
    const response = { data: [] };
    spyOn(component, 'handleGetAppointmentsResponse');
    component.handleGetAppointmentsResponse(response);
    expect(component.handleGetAppointmentsResponse).toHaveBeenCalledWith(response);
  });

  it('should handle error response from getAppointmentsServices', () => {
    const error = { message: 'Error occurred' };
    spyOn(component, 'handleGetAppointmentError');
    component.handleGetAppointmentError(error);
    expect(component.handleGetAppointmentError).toHaveBeenCalledWith(error);
  });

  it('should call getInjuries method', () => {
    spyOn(component, 'getInjuries');
    component.getInjuries();
    expect(component.getInjuries).toHaveBeenCalled();
  });

  it('should call createAppointment method', () => {
    spyOn(component, 'createAppointment');
    component.createAppointment();
    expect(component.createAppointment).toHaveBeenCalled();
  });

  it('should call closeWindow method', () => {
    spyOn(component, 'closeWindow');
    component.closeWindow();
    expect(component.closeWindow).toHaveBeenCalled();
  });
});
