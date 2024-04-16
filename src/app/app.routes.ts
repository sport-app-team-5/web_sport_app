import { Routes } from '@angular/router'
import { SportplanComponent } from './components/sportplan/sportplan.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { LoginComponent } from './components/login/login.component'
import { NutritionalInformationComponent } from "./components/nutritional-information/nutritional-information.component";
import { MainComponent } from './components/main/main.component'
import {AdditionalserviceComponent} from "./components/additionalservice/additionalservice.component";

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
    component: NutritionalInformationComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent
  },
  {
    path: 'services',
    component: AdditionalserviceComponent
  },
  {
    path: 'products',
    component: AdditionalserviceComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent
  },
  {
    path: 'home',
    component: MainComponent
  }
]
