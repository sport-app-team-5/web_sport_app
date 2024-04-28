import { Routes } from '@angular/router'
import { SportplanComponent } from './components/sportplan/sportplan.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { NutritionalInformationComponent } from './components/nutritional-information/nutritional-information.component'
import { MainComponent } from './components/main/main.component'
import {AdditionalserviceComponent} from "./components/additionalservice/additionalservice.component";
import {DashboardComponent} from "./components/dashboard/dashboard.component";
import {ProductComponent} from "./components/product/product.component";
import { inject } from '@angular/core'
import { AuthService } from '../app/services/auth.service'
import { SportsInformationComponent } from './components/sports-information/sports-information.component'
import { ThirdPartyCreateEventComponent } from './third-party/third-party-create-event/third-party-create-event.component'
import {ExerciseComponent} from "./components/exercise/exercise.component";

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
  },
  {
    path: 'sports-information',
    component: SportsInformationComponent,
    
  },
  {
    path: 'sportplan',
    component: SportplanComponent,
  },
  {
    path: 'services',
    component: AdditionalserviceComponent
  },
  {
    path: 'products',
    component: ProductComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent
  },
  {
    path: 'home',
    component: MainComponent,
     
  }, 
  {
    path: 'events',
    component: ThirdPartyCreateEventComponent
  },
  {
    path: 'exercise',
    component: ExerciseComponent
  },
]
