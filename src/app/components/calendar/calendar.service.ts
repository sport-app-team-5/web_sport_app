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

  subscribeToEvent(eventId:any,spormanId: any) {
    let data={
      "event_id": eventId,
      "sportman_id": spormanId
    }
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/events/associate', data, { headers })
  }

  getAllEventsSuscribed(sportmanId: any,startDate:any,endDate:any): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get(API_ADDITIONAL_SERVICE_BASE_URL + `auth/events/sport/event/subscribed?sportman_id=${sportmanId}&initial_date=${startDate}&final_date=${endDate}`, { headers })
  }
}
