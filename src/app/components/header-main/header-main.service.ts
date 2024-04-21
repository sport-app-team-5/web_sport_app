import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HeaderMainService {

constructor() { }

    private isActiveProfileSubject: BehaviorSubject<boolean> =
        new BehaviorSubject<boolean>(false)

    public getIsActiveProfile (): Observable<boolean> {
        return this.isActiveProfileSubject.asObservable()
    }
    public setIsActiveProfile (value: boolean): void {
        this.isActiveProfileSubject.next(value)
    }
}
