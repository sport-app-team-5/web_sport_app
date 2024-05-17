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

  getProductsByType(serviceType: string): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    const url = `${API_ADDITIONAL_SERVICE_BASE_URL}/api/v1/auth/services/type/${serviceType}`;
    return this.http.get(url, { headers });
  }

  createScheduleAppointment(data: any): Observable<any> {
    const token = sessionStorage.getItem('access_token')
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    const url = `${API_ADDITIONAL_SERVICE_BASE_URL}/api/v1/auth/appointment`;
    return this.http.post(url, data, { headers });
  }
}

