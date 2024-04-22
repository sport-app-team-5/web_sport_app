import {inject, TestBed} from '@angular/core/testing';
import {TranslateLoader, TranslateModule, TranslateService} from "@ngx-translate/core";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {HttpLoaderFactory} from "../../app.config";
import {HttpClient} from "@angular/common/http";
import {ProductService} from "./product.service";
import { API_ADDITIONAL_SERVICE_BASE_URL, API_USER_BASE_URL } from '../../../../api.constants';

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

  it('should use product service', inject(
    [ProductService],
    (service: ProductService) => {
      expect(service).toBeTruthy()
    }
  ))

  it('should create product', () => {
    const dummyData = { name: 'test', cost: '123' }
    const expectedResponse = { token: 'dummyToken' }

    // Hacer la solicitud HTTP de prueba
    service.createProduct(dummyData).subscribe(response => {
        expect(response).toEqual(expectedResponse) 
    })

    const req = httpMock.expectOne(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/products') 
    const requestBody = new URLSearchParams(req.request.body)

    expect(req.request.method).toBe('POST') 
    expect(requestBody.get('name')).toBe(dummyData.name)
    expect(requestBody.get('cost')).toBe(dummyData.cost)
    req.flush(expectedResponse)
})
})

