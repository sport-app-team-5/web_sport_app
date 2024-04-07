import { ComponentFixture, TestBed } from '@angular/core/testing'
import { RegisterComponent } from './register.component'
import { HttpClient } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController,
  provideHttpClientTesting
} from '@angular/common/http/testing'
import { provideRouter } from '@angular/router'
import { provideMockStore } from '@ngrx/store/testing'

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let httpClient: HttpClient
  let httpTestingController: HttpTestingController

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [RegisterComponent, HttpClientTestingModule],
      providers: [provideMockStore(), provideRouter([])]
    })
    httpClient = TestBed.inject(HttpClient)
    httpTestingController = TestBed.inject(HttpTestingController)
  })

  beforeEach((): void => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
