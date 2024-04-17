/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { AuthService } from './auth.service'
import { Router } from '@angular/router'

describe('Service: Auth', () => {
  let router: Router

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService]
    })
    router = TestBed.inject(Router)
  })

  it('should ...', inject([AuthService], (service: AuthService) => {
    expect(service).toBeTruthy()
  }))

  it('should ...', inject([AuthService], (service: AuthService) => {
    spyOn(sessionStorage, 'getItem').and.returnValue('access_token')
    expect(service.canActivate()).toBe(true)
  }))
})
