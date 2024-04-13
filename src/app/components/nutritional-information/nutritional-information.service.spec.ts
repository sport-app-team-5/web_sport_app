import { TestBed } from '@angular/core/testing';
import { NutritionalInformationService } from './nutritional-information.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {API_USER_BASE_URL} from "../../../../api.constants";

describe('NutritionalInformationService', () => {
  let service: NutritionalInformationService
  let httpMock: HttpTestingController

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
      ],
      providers: [NutritionalInformationService,TranslateService]
    })

    service = TestBed.inject(NutritionalInformationService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create nutritional information', () => {
    const mockData = { User: 'Test User' }
    service.createNutritionalInformation(mockData).subscribe(data => {
      expect(data).toEqual(mockData)
    })

    const req = httpMock.expectOne(`${API_USER_BASE_URL}users`)
    expect(req.request.method).toBe('POST')
    req.flush(mockData)
  })
});
