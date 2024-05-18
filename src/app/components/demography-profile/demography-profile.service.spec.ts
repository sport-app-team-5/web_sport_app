import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";
import {DemographyProfileService} from "./demography-profile.service";

describe('DemographyProfileService', () => {
  let service: DemographyProfileService
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
      providers: [DemographyProfileService,TranslateService]
    })

    service = TestBed.inject(DemographyProfileService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create nutritional information', () => {
    const mockData = { User: 'Test User' }
    service.getProfile({}).subscribe(data => {
      expect(data).toEqual(mockData)
    })

    const req = httpMock.expectOne(`${API_SPORT_PLAN_BASE_URL}auth/sports_men/profile/sport`)
    expect(req.request.method).toBe('GET')
    req.flush(mockData)
  })
});
