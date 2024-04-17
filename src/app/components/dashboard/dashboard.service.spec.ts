import { TestBed } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";
import {DashboardService} from "./dashboard.service";

describe('DashboardService', () => {
  let service: DashboardService
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
      providers: [DashboardService,TranslateService]
    })

    service = TestBed.inject(DashboardService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create nutritional information', () => {
    const mockData = { User: 'Test User' }
    service.getProfile().subscribe(data => {
      expect(data).toEqual(mockData)
    })

    const req = httpMock.expectOne(`${API_SPORT_PLAN_BASE_URL}auth/profile`)
    expect(req.request.method).toBe('GET')
    req.flush(mockData)
  })
});
