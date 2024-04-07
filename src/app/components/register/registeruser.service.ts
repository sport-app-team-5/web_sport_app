import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import {
  API_SPORT_PLAN_BASE_URL,
  API_USER_BASE_URL
} from '../../../../api.constants'

@Injectable({ providedIn: 'root' })
export class RegisterUserService {
  private http: any

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  createUser (data: any): Observable<any> {
    return this.http.post(API_USER_BASE_URL + 'users', data)
  }

  saveInfoSporPlanService (user_id: any): Observable<any> {
    return this.http.post(API_SPORT_PLAN_BASE_URL + 'sport_men', user_id)
  }

  getCountries (): Observable<any> {
    return this.http.get(API_USER_BASE_URL + 'locations/countries')
  }

  getCities (country_id: any): Observable<any> {
    return this.http.get(API_USER_BASE_URL + 'locations/cities/' + country_id)
  }
}
