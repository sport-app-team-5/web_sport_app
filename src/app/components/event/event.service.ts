import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants'

@Injectable({providedIn: 'root'})
export class EventService {

  constructor (private http: HttpClient) {}

  registerEvent (data: any): Observable<any> {
    let token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token')
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.post(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/events', data, { headers })
  }

  getEvents (): Observable<any> {
    let token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token')
    }

    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })
    return this.http.get(API_ADDITIONAL_SERVICE_BASE_URL + 'auth/events/third_parties', { headers })
  }
}
