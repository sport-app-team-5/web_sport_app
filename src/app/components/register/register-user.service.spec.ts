/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { RegisterUserService } from './registeruser.service'
import { provideMockStore } from '@ngrx/store/testing'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'

describe('Service: RegisterUser', () => {
  let service: RegisterUserService
  let httpMock: HttpTestingController

  beforeEach(() => {
    const spy = jasmine.createSpyObj('RegisterUserService', ['createUser'])
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        RegisterUserService,
        { provide: RegisterUserService, useValue: spy }
      ]
    })

    service = TestBed.inject(RegisterUserService)
    httpMock = TestBed.inject(HttpTestingController)
    service = TestBed.inject(
      RegisterUserService
    ) as jasmine.SpyObj<RegisterUserService>
  })

  afterEach(() => {
    httpMock.verify()
  })

  it('should be created', () => {
    expect(service).toBeTruthy()
  })
  
})
