import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable, Injector } from '@angular/core'
import { Observable } from 'rxjs'
import {
    API_SPORT_PLAN_BASE_URL
} from '../../../../api.constants'

@Injectable({
  providedIn: 'root'
})
export class CasificationRiskGroupService {

private http: any;

constructor(private injector: Injector) {
  this.http = this.injector.get<HttpClient>(HttpClient)
}

getRiskGroupService (): Observable<any> {
  let token=null
  if (typeof window !== 'undefined' && window.sessionStorage) {
    token = sessionStorage.getItem('access_token');
  }     

  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
  })

  return this.http.get(
    API_SPORT_PLAN_BASE_URL +
          'auth/sports_men/profile/sport',
      { headers }
  )
}

setPlanSuscriptionService (suscriptionType: string): Observable<any> {
  const token = sessionStorage.getItem('access_token')
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
  })

  return this.http.put(
    API_SPORT_PLAN_BASE_URL +
        `'auth/sports_men/profile/sport/${suscriptionType}'`,
      { headers }
  )
}

}
