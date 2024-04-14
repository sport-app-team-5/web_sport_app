/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { AdditionalServiceService } from './additional-service.service'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { HttpClient } from '@angular/common/http'

describe('Service: AdditionalService', () => {
    let httpMock: HttpTestingController
    let service: AdditionalServiceService

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AdditionalServiceService, TranslateService],
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
        service = TestBed.inject(AdditionalServiceService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    it('should ...', inject(
        [AdditionalServiceService],
        (service: AdditionalServiceService) => {
            expect(service).toBeTruthy()
        }
    ))
})
