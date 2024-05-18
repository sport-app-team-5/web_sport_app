import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


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

  getCheck() {
    return this.currentCheck;
  }
 
}
