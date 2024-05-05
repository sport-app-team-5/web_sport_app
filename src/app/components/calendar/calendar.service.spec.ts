import { TestBed } from '@angular/core/testing';

import { CalendarService } from './calendar.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

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
  
});
