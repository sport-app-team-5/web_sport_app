/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing'
import { By } from '@angular/platform-browser'
import { DebugElement } from '@angular/core'

import { LoginComponent } from './login.component'
import { ToastrModule, ToastrService } from 'ngx-toastr'
import { LoginService } from './login.service'
import { HttpClient, HttpClientModule } from '@angular/common/http'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import {
    TranslateLoader,
    TranslateModule,
    TranslateService
} from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { of } from 'rxjs'

describe('LoginComponent', () => {
    let component: LoginComponent
    let fixture: ComponentFixture<LoginComponent>
    let registerUserService: LoginService
    let translateService: TranslateService
    let toastr: ToastrService
    let loginServiceSpy: jasmine.SpyObj<LoginService>

    let httpMock: HttpTestingController

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                LoginComponent,
                HttpClientModule,
                HttpClientTestingModule,
                ReactiveFormsModule,
                FormsModule,
                ToastrModule.forRoot(),
                TranslateModule.forRoot({
                    loader: {
                        provide: TranslateLoader,
                        useFactory: HttpLoaderFactory,
                        deps: [HttpClient]
                    }
                })
            ],
            providers: [LoginService, ToastrService, TranslateService]
        }).compileComponents()
    }))

    beforeEach(() => {
        fixture = TestBed.createComponent(LoginComponent)
        component = fixture.componentInstance
        registerUserService = TestBed.inject(LoginService)
        translateService = TestBed.inject(TranslateService)
        toastr = TestBed.inject(ToastrService) // Inject ToastrService
        httpMock = TestBed.inject(HttpTestingController)

        fixture.detectChanges()
    })

    it('should create', () => {
        expect(component).toBeTruthy()
    })

    it('should call userLogin', () => {
        component.email.setValue('prueba@gmail.com')
        component.password.setValue('prieba123')
        let mock = TestBed.inject(LoginService)
        spyOn(mock, 'login').and.returnValue(of({}))
        component.userLogin()
        expect(component).toBeTruthy()
    })
    it('should call userLogin with password and email empty', () => {
        component.email.setValue('')
        component.password.setValue('')
        let mock = TestBed.inject(LoginService)
        spyOn(component, 'handleUpdateResponse')
        spyOn(mock, 'login').and.returnValue(of({ access_token: 'ldfjksd' }))
        component.userLogin()
        expect(component).toBeTruthy()
    })

    it('should call handleError', () => {
        const mockResponse = {
            status: 400,
            error: { detail: 'Incorrect username or password' }
        }
        const toastrService = TestBed.inject(ToastrService)
        const errorText = 'Usuario o contraseña incorrecto'

        const spyError = spyOn(toastrService, 'error')

        component.handleError(mockResponse)

        expect(spyError).toHaveBeenCalledWith(errorText, 'Error', {
            timeOut: 3000
        })
    })
    it('should call changeValueForm', () => {
        const inputElement = fixture.debugElement.nativeElement.querySelector(
            'input[name="email"]'
        )
        const event = {
            target: { name: 'email', value: 'email' }
        }
        component.changeValueForm(event as any)
        expect(component).toBeTruthy()
    })
})
