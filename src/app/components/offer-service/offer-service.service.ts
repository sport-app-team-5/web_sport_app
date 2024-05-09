import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class OfferServiceService {

  constructor() { }
  private checkSource = new BehaviorSubject<boolean>(false);
  currentCheck = this.checkSource.asObservable();

  changeCheck(value: boolean) {
    this.checkSource.next(value);
  }
 
}
