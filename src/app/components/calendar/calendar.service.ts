import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs'
import { API_ADDITIONAL_SERVICE_BASE_URL, API_SPORT_PLAN_BASE_URL, API_USER_BASE_URL } from '../../../../api.constants';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  private http: any

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  getAllEvents(initial_date: any, final_date: any, city_id: any): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get(API_ADDITIONAL_SERVICE_BASE_URL +
      `auth/events/sport?initial_date=${initial_date}&final_date=${final_date}&city_id=${city_id}`, { headers })
  }
}
