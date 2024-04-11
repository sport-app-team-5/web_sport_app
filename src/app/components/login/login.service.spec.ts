/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing'
import { LoginService } from './login.service'
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'
import { HttpLoaderFactory } from '../../app.config'
import { HttpClient } from '@angular/common/http'
import { API_USER_BASE_URL } from '../../../../api.constants'

describe('Service: Login', () => {
    let service: LoginService
    let httpMock: HttpTestingController

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [LoginService],
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
        service = TestBed.inject(LoginService)
        httpMock = TestBed.inject(HttpTestingController)
    })

    it('should ...', inject([LoginService], (service: LoginService) => {
        expect(service).toBeTruthy()
    }))

    it('should create user', () => {
        const dummyData = { email: 'test@example.com', password: 'password123' }
        const expectedResponse = { token: 'dummyToken' }

        // Hacer la solicitud HTTP de prueba
        service.login(dummyData).subscribe(response => {
            expect(response).toEqual(expectedResponse) // Verificar que la respuesta sea la esperada
        })

        const req = httpMock.expectOne(API_USER_BASE_URL + 'login') // Verificar que se realiza una solicitud a la URL esperada
        const requestBody = new URLSearchParams(req.request.body)

        expect(req.request.method).toBe('POST') // Verificar que el método HTTP sea POST
        expect(requestBody.get('username')).toBe(dummyData.email) // Verificar que el cuerpo de la solicitud contenga el correo electrónico esperado
        expect(requestBody.get('password')).toBe(dummyData.password)

        req.flush(expectedResponse)
    })
})
