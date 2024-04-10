import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import { API_USER_BASE_URL } from '../../../../api.constants'

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private http: any

    constructor (private injector: Injector) {
        this.http = this.injector.get<HttpClient>(HttpClient)
    }

    login (data: any): Observable<any> {
        const body = new URLSearchParams()
        body.set('username', data.email)
        body.set('password', data.password)
        body.set('scope', '')
        body.set('client_secret', 'Secret')

        const headers = new HttpHeaders({
            'Content-Type': 'application/x-www-form-urlencoded'
        })

        return this.http.post(API_USER_BASE_URL + 'login', body.toString(), { headers })        
    }
}
