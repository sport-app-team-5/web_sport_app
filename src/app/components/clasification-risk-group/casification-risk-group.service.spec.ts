/* tslint:disable:no-unused-variable */

import { TestBed, inject } from '@angular/core/testing';
import { CasificationRiskGroupService } from './casification-risk-group.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../../app.config';
import { HttpClient } from '@angular/common/http';

describe('Service: CasificationRiskGroup', () => {
  let service: CasificationRiskGroupService
  let httpMock: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CasificationRiskGroupService],
      imports:[
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
    service = TestBed.inject(CasificationRiskGroupService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should ...', inject([CasificationRiskGroupService], (service: CasificationRiskGroupService) => {
    expect(service).toBeTruthy();
  }));
});
