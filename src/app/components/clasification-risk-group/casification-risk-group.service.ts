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

registerRiskGroupService (data: any): Observable<any> {
  const token = sessionStorage.getItem('access_token')
  const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
  })

  return this.http.post(
    API_SPORT_PLAN_BASE_URL +
          'auth/services',
      data,
      { headers }
  )
}

}
