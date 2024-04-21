/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { NutritionalProfileListService } from './nutritional-profile-list.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';
import { NutritionalInformationService } from '../nutritional-information/nutritional-information.service';

describe('Service: NutritionalProfileList', () => {
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
    expect(service).toBeTruthy()
  })
});
