import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const isAuthenticated =
        window.sessionStorage.getItem('access_token') !== null;
      if (!isAuthenticated) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
