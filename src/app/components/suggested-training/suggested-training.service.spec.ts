import {inject, TestBed} from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {SuggestedTrainingService} from "./suggested-training.service";

describe('SuggestedSuggestedTrainingService', () => {
  let httpMock: HttpTestingController
  let service: SuggestedTrainingService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SuggestedTrainingService, TranslateService],
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
    service = TestBed.inject(SuggestedTrainingService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should use product service', inject(
    [SuggestedTrainingService],
    (service: SuggestedTrainingService) => {
      expect(service).toBeTruthy()
    }
  ))
})
