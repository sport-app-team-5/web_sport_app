/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { ScheduleAppointmentService } from './schedule-appointment.service';

describe('Service: ScheduleAppointment', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleAppointmentService]
    });
  });

  it('should ...', inject([ScheduleAppointmentService], (service: ScheduleAppointmentService) => {
    expect(service).toBeTruthy();
  }));
});
