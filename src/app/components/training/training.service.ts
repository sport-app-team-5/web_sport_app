import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";

@Injectable({providedIn: 'root'})
export class TrainingService {
  private http: any

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  createTraining (data: any): Observable<any> {
    let token=null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token')

    }
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post(API_SPORT_PLAN_BASE_URL + 'auth/trainings', data, { headers })
  }

  getTrainings (): Observable<any> {
    let token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token')
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get(API_SPORT_PLAN_BASE_URL + 'auth/trainings/sportsman', { headers })
  }
}
