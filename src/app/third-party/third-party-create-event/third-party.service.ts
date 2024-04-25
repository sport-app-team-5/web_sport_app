import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import {
    API_ADDITIONAL_SERVICE_BASE_URL
} from '../../../../api.constants'

@Injectable({
    providedIn: 'root'
})
export class ThirdPartyService {

    constructor (private http: HttpClient) {
    }

    registerEvent (data: any): Observable<any> {
        const token = sessionStorage.getItem('access_token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        })

        return this.http.post(
            API_ADDITIONAL_SERVICE_BASE_URL +
                'auth/events',
            data,
            { headers }
        )
    }
}
