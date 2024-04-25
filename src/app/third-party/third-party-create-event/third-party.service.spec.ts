/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { HttpClient } from '@angular/common/http'
import { ThirdPartyService } from './third-party.service'
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants'

describe('Service: ThirdPartyService', () => {
    let httpMock: HttpTestingController
    let service: ThirdPartyService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [ThirdPartyService, TranslateService],
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
        service = TestBed.inject(ThirdPartyService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    it('should ...', inject(
        [ThirdPartyService],
        (service: ThirdPartyService) => {
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

})
