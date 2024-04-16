import {inject, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";

describe('ProductService', () => {
  let httpMock: HttpTestingController
  let service: ProductService

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProductService, TranslateService],
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
    service = TestBed.inject(ProductService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  it('should ...', inject(
    [ProductService],
    (service: ProductService) => {
      expect(service).toBeTruthy()
    }
  ))
})

