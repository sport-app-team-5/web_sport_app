
import { TestBed, inject } from '@angular/core/testing';
import { ScheduleAppointmentService } from './schedule-appointment.service';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient} from '@angular/common/http';
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants';

describe('Service: ScheduleAppointment', () => {

  let appointmentService: ScheduleAppointmentService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScheduleAppointmentService, TranslateService],
      imports: [
        HttpClientTestingModule,
        TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
          }
        })
      ]
    })

    appointmentService = TestBed.inject(ScheduleAppointmentService)
    httpMock = TestBed.inject(HttpTestingController)

  });

  it('should ...', inject([ScheduleAppointmentService], (service: ScheduleAppointmentService) => {
    expect(service).toBeTruthy();
  }));

  it('should retrieve service by type', () => {
    const expectedResponse = { token: 'dummyToken' }
    const dummyData = {description: null}
    const serviceType = 'SPORT_SPECIALIST';
    const expectedUrl = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/type/${serviceType}`;

    appointmentService.getServiceByType(serviceType).subscribe(response => {
      expect(response).toEqual(expectedResponse)
    })

    const req = httpMock.expectOne(expectedUrl)
    const requestBody = new URLSearchParams(req.request.body)

    expect(req.request.method).toBe('GET')
    expect(requestBody.get('description')).toBe(dummyData.description)
    req.flush(expectedResponse)
  })

  it('should create a schedule appointment', () => {
    const dummyData = { appointmentId: '1', date: '2022-01-01', time: '10:00 AM' };
    const expectedResponse = { success: true };

    appointmentService.createScheduleAppointment(dummyData).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const expectedUrl = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/appointment`;
    const req = httpMock.expectOne(expectedUrl);
    const requestBody = new URLSearchParams(req.request.body)

    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(requestBody.get('appointmentId')).toBe(dummyData.appointmentId)
    expect(requestBody.get('date')).toBe(dummyData.date)
    expect(requestBody.get('time')).toBe(dummyData.time)

    req.flush(expectedResponse);
  });

  it('should retrieve schedule appointment', () => {
    const expectedResponse = { appointmentId: '1', date: '2022-01-01', time: '10:00 AM' };
    const sportmanId = 1;
    const expectedUrl = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/appointment/${sportmanId}`;

    appointmentService.getScheduleAppointment(sportmanId.toString()).subscribe(response => {
      expect(response).toEqual(expectedResponse);
    });

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');
    req.flush(expectedResponse);
  });


});
