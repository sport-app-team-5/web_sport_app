import { inject } from '@angular/core'
import { AuthService } from '../app/services/auth.service'

export const domainGuard = () => {
  const service = inject(AuthService)
  return service.canActivate()
  
}
