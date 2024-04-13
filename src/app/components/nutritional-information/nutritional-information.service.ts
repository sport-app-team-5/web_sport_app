import {Injectable, Injector} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {API_SPORT_PLAN_BASE_URL} from "../../../../api.constants";

@Injectable({
  providedIn: 'root'
})
export class NutritionalInformationService {
  private http: any

  constructor (private injector: Injector) {
    this.http = this.injector.get<HttpClient>(HttpClient)
  }

  updateInformation(data: any): Observable<any> {
    return this.http.put(API_SPORT_PLAN_BASE_URL + 'users', data)
  }

  getAllergies(): Observable<any> {
    return this.http.get(API_SPORT_PLAN_BASE_URL + 'auth/allergies')
  }
}
