import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants';
import { HttpHeaders } from '@angular/common/http';

describe('CalendarService', () => {
  let service: CalendarService;
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule


      ],
      providers: [CalendarService]
    })
    service = TestBed.inject(CalendarService);

    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  
  it('should return all events', () => {
    const initialDate = '2022-01-01';
    const finalDate = '2022-12-31';
    const cityId = 1;
    const expectedUrl = `auth/events/sport?initial_date=${initialDate}&final_date=${finalDate}&city_id=${cityId}`;

    service.getAllEvents(initialDate, finalDate, cityId).subscribe((response) => {
      expect(response).toBeTruthy();
   
    });

    const req = httpMock.expectOne(API_ADDITIONAL_SERVICE_BASE_URL + expectedUrl);
    expect(req.request.method).toBe('GET');


    req.flush({ /* Mock response data */ });
  });

  
  it('should return all events', () => {
    const initialDate = '2022-01-01';
    const finalDate = '2022-12-31';
    const cityId = 1;
    const expectedUrl = `auth/events/sport?initial_date=${initialDate}&final_date=${finalDate}&city_id=${cityId}`;

    service.getAllEvents(initialDate, finalDate, cityId).subscribe((response) => {
      expect(response).toBeTruthy();
    });

    const req = httpMock.expectOne(API_ADDITIONAL_SERVICE_BASE_URL + expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush({ });
  });


});
