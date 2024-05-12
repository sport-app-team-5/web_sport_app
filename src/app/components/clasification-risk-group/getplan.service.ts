import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import {
  API_SPORT_PLAN_BASE_URL
} from '../../../../api.constants'
@Injectable({
  providedIn: 'root'
})
export class GetplanService {

  private http: any


  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  getPlan(suscription_type: any): Observable<any> {

    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    })
    return this.http.post(API_SPORT_PLAN_BASE_URL + 'api/v1/auth/sports_men/profile/set_suscription/' +
      { suscription_type }, {headers})
  }


}
