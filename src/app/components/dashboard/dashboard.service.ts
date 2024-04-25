import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private http: any
  token = sessionStorage.getItem('access_token')
  headers = new HttpHeaders({'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
  })

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  getProfile(): Observable<any> {
    return this.http.get(API_SPORT_PLAN_BASE_URL + 'auth/sports_men/profile/sport', { headers: this.headers })
  }
}
