import { Injectable, Injector } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_SPORT_PLAN_BASE_URL } from '../../../../api.constants';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http: any;

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient);
  }

  getProfile(token: any): Observable<any> {
    if (!token) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        token = sessionStorage.getItem('access_token');
      }

    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      API_SPORT_PLAN_BASE_URL + 'auth/sports_men/profile/sport',
      { headers: headers }
    );
  }

  getInjuries(token: any): Observable<any> {
    if (!token) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        token = sessionStorage.getItem('access_token');
      }

    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      API_SPORT_PLAN_BASE_URL + 'auth/injuries/sportsman',
      { headers: headers }
    );
  }

  getSessions(token: any): Observable<any> {
    if (!token) {
      if (typeof window !== 'undefined' && window.sessionStorage) {
        token = sessionStorage.getItem('access_token');
      }

    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(
      API_SPORT_PLAN_BASE_URL + 'auth/trainings/plan/sportsman',
      { headers: headers }
    );
  }
}
