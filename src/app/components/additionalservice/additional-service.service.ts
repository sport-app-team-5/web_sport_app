import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import {
    API_ADDITIONAL_SERVICE_BASE_URL,
    API_SPORT_PLAN_BASE_URL,
    API_USER_BASE_URL
} from '../../../../api.constants'

@Injectable({
    providedIn: 'root'
})
export class AdditionalServiceService {
    private http: any

    constructor (private injector: Injector) {
        this.http = this.injector.get<HttpClient>(HttpClient)
    }

    registerAdditionalService (data: any): Observable<any> {
        const token = sessionStorage.getItem('access_token')
        const headers = new HttpHeaders({
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        })

        return this.http.post(
            API_ADDITIONAL_SERVICE_BASE_URL +
                'additional_service/services',
            data,
            { headers }
        )
    }
}
