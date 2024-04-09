import { Routes } from '@angular/router'
import { AdditionalserviceComponent } from './components/additionalservice/additionalservice.component'
import { SportplanComponent } from './components/sportplan/sportplan.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'
import { NutritionalInformationComponent } from "./components/nutritional-information/nutritional-information.component";

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent
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
    path: 'services',
    component: AdditionalserviceComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent
  }
]
