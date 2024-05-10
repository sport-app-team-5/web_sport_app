import { TestBed } from '@angular/core/testing';
import { OfferServiceService } from './offer-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { AdditionalServiceService } from '../additionalservice/additional-service.service';
import { AdittionaloffersService } from './adittionaloffers.service';
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants';

describe('OfferServiceService', () => {
  let serviceOffer: OfferServiceService;
  let additionalService:AdittionaloffersService
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
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
    });

    serviceOffer = TestBed.inject(OfferServiceService);
    additionalService=TestBed.inject(AdittionaloffersService)
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(serviceOffer).toBeTruthy();
  });
});
