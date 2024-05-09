import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MainService {

  private activeMenu = new BehaviorSubject<any>(null);
  activeMenu$ = this.activeMenu.asObservable();

  setMenuActive(value: any) {
    this.activeMenu.next(value);
  }

}
