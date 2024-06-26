import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";
import {TrainingService} from "./training.service";

describe('TrainingService', () => {
  let httpMock: HttpTestingController
  let service: TrainingService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TrainingService, TranslateService],
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
    service = TestBed.inject(TrainingService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should use product service', inject(
    [TrainingService],
    (service: TrainingService) => {
      expect(service).toBeTruthy()
    }
  ))

  it('should create product', () => {
    const dummyData = { name: 'test', cost: '123' }
    const expectedResponse = { token: 'dummyToken' }

    service.createTraining(dummyData).subscribe(response => {
      expect(response).toEqual(expectedResponse)
    })

    const req = httpMock.expectOne(API_SPORT_PLAN_BASE_URL + 'auth/trainings')
    const requestBody = new URLSearchParams(req.request.body)

    expect(req.request.method).toBe('POST')
    expect(requestBody.get('name')).toBe(dummyData.name)
    expect(requestBody.get('cost')).toBe(dummyData.cost)
    req.flush(expectedResponse)
  })
})
