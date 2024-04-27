import { Routes } from '@angular/router'
import { SportplanComponent } from './components/sportplan/sportplan.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { NutritionalInformationComponent } from './components/nutritional-information/nutritional-information.component'
import { MainComponent } from './components/main/main.component'
import {AdditionalserviceComponent} from "./components/additionalservice/additionalservice.component";
import {ProductComponent} from "./components/product/product.component";
import { inject } from '@angular/core'
import { AuthService } from '../app/services/auth.service'
import { SportsInformationComponent } from './components/sports-information/sports-information.component'

export const domainGuard = () => {
  const service = inject(AuthService)
  return service.canActivate()
  
}
export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'nutritional-information',
    component: NutritionalInformationComponent,
    canActivate: [domainGuard]
  },
  {
    path: 'sports-information',
    component: SportsInformationComponent,
    canActivate: [domainGuard]
  },
  {
    path: 'sportplan',
    component: SportplanComponent,
    canActivate: [domainGuard]
  },
  {
    path: 'services',
    component: AdditionalserviceComponent,
    canActivate: [domainGuard]
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent,
    canActivate: [domainGuard]
  },
  {
    path: 'home',
    component: MainComponent,
    // canActivate: [domainGuard]
  }
]
