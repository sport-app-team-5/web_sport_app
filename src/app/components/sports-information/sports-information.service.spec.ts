import { TestBed, async, inject } from '@angular/core/testing';
import { SportsInformationService } from './sports-information.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('Service: SportsInformation', () => {
  let service: SportsInformationService
  let httpMock: HttpTestingController
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule],
      providers: [SportsInformationService  ]
    });
    service = TestBed.inject(SportsInformationService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(service).toBeTruthy()
  })

});
