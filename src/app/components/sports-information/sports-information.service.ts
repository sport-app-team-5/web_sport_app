import { Injectable,Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs'
import { API_SPORT_PLAN_BASE_URL } from '../../../../api.constants';

@Injectable({ providedIn: 'root' })
export class SportsInformationService {
  private http: any

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  createSportProfile (data: any,user_id:any): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    })
    return this.http.put(API_SPORT_PLAN_BASE_URL + 'auth/sports_men/profile/sport/' + user_id, data, { headers })
  }
}
