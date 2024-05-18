import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ADDITIONAL_SERVICE_BASE_URL } from '../../../../api.constants';

@Injectable({
  providedIn: 'root'
})
export class AdittionaloffersService {
  private http: any

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  getAdditionalServices (inside_house:boolean): Observable<any> {
    let token = null
    if (typeof window !== 'undefined' && window.sessionStorage) {
      token = sessionStorage.getItem('access_token')
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    })

    return this.http.get(API_ADDITIONAL_SERVICE_BASE_URL +`auth/services?/is_inside_house=${inside_house}` , { headers })
  }
}
