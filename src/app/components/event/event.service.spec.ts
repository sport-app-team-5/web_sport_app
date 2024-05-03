import { TestBed, async, inject } from '@angular/core/testing'
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing'
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { HttpClient } from '@angular/common/http'
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants'
import {EventService} from "./event.service";

describe('Service: EventService', () => {
  let httpMock: HttpTestingController
  let service: EventService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventService, TranslateService],
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
    service = TestBed.inject(EventService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should ...', inject(
    [EventService],
    (service: EventService) => {
      expect(service).toBeTruthy()
    }
  ))

  it('should register event', () => {
    const mockData = { key: 'value' };
    const mockResponse = { result: 'success' };
    const token = 'test_token';

    spyOn(sessionStorage, 'getItem').and.returnValue(token);

    service.registerEvent(mockData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/events');
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toEqual(mockData);

    req.flush(mockResponse);
  });

  it('should get events', () => {
    const mockResponse = { result: 'success' };
    const token = 'test_token';

    spyOn(sessionStorage, 'getItem').and.returnValue(token);

    service.getEvents().subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/events/third_parties');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Content-Type')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    req.flush(mockResponse);
  });
})
