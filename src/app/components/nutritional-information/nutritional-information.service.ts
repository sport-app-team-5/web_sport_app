import {Injectable, Injector} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";

@Injectable({
  providedIn: 'root'
})
export class NutritionalInformationService {
  private http: any
  token = sessionStorage.getItem('access_token')
  headers = new HttpHeaders({'Content-Type': 'application/json',
    Authorization: `Bearer ${this.token}`
  })

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  createNutritionalInformation(data: any): Observable<any> {
    return this.http.post(API_SPORT_PLAN_BASE_URL + 'auth/nutritional_information/1', data, { headers: this.headers })
  }

  getAllergies(): Observable<any> {
    return this.http.get(API_SPORT_PLAN_BASE_URL + 'auth/allergies', { headers: this.headers })
  }
}
