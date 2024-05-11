import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdittionalOffersService } from './adittionaloffers.service';

describe('AdittionalOffersService', () => {
  let service: AdittionalOffersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdittionalOffersService]
    });
    service = TestBed.inject(AdittionalOffersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});