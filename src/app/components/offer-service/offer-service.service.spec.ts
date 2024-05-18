import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AdittionaloffersService } from './adittionaloffers.service';

describe('AdittionaloffersService', () => {
  let service: AdittionaloffersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AdittionaloffersService]
    });

    service = TestBed.inject(AdittionaloffersService);
    httpMock = TestBed.inject(HttpTestingController);
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch additional services', () => {
    const dummyData = { data: 'Dummy data' };

    service.getAdditionalServices(true).subscribe(data => {
      expect(data).toEqual(dummyData);
    });

    expect(service).toBeTruthy();

  });
});
