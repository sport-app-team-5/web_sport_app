import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { API_ADDITIONAL_SERVICE_BASE_URL } from "../../../../api.constants";

@Injectable({
  providedIn: 'root'
})
export class ScheduleAppointmentService {
  private http: any

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  getServiceByType(serviceType: string): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    const url = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/type/${serviceType}`;
    return this.http.get(url, { headers });
  }

  createScheduleAppointment(data: any): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    const url = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/appointment`;
    return this.http.post(url, data, { headers });
  }

  getScheduleAppointment(): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const sportman_id = sessionStorage.getItem('sportman_id')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    const url = `${API_ADDITIONAL_SERVICE_BASE_URL}auth/services/appointment/${sportman_id}`;
    return this.http.get(url, { headers });
  }
}

