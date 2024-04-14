import { HttpClient } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import {
  API_ADDITIONAL_SERVICE_BASE_URL,
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

  saveInfoSporPlanService (data: any): Observable<any> {
    return this.http.post(API_SPORT_PLAN_BASE_URL + 'sports_men', data)
  }

  getCountries (): Observable<any> {
    return this.http.get(API_USER_BASE_URL + 'locations/countries')
  }

  getCities (country_id: any): Observable<any> {
    return this.http.get(API_USER_BASE_URL + 'locations/cities/' + country_id)
  }

  registerSupplier (data: any): Observable<any> {
    return this.http.post(
      API_ADDITIONAL_SERVICE_BASE_URL + 'third_parties',
      data
    )
  }
}
