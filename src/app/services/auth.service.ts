import { Injectable } from '@angular/core'
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor (private router: Router) {}

  canActivate (): boolean {
    const isAuthenticated = sessionStorage?.getItem('access_token') !== null;
    if (!isAuthenticated) {
      this.router.navigate(['/login'])
      return false
    }

    return true
  }
}
