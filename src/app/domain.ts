import { inject } from '@angular/core'
import { Router } from '@angular/router'
import { tap } from 'rxjs'
import { AuthService } from '../app/services/auth.service'

export const domainGuard = () => {
  const router = inject(Router)
  const service = inject(AuthService)
  return service.canActivate()
  
}
