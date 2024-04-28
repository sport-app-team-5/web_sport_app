import { Injectable, Injector, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_SPORT_PLAN_BASE_URL } from '../../../../api.constants';

@Injectable({
  providedIn: 'root',
})
export class NutritionalInformationService {
  private http: any;
  token: string | null = null;

  constructor(private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient);
  }

  createNutritionalInformation(data: any, token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.post(
      API_SPORT_PLAN_BASE_URL + 'auth/nutritional_information/1',
      data,
      { headers: headers }
    );
  }

  getAllergies(token: any): Observable<any> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(API_SPORT_PLAN_BASE_URL + 'auth/allergies', {
      headers: headers,
    });
  }
}
