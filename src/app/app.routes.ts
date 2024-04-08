import { Routes } from '@angular/router'
import { UsersComponent } from './components/users/users.component'
import { AdditionalserviceComponent } from './components/additionalservice/additionalservice.component'
import { SportplanComponent } from './components/sportplan/sportplan.component'
import { HomeComponent } from './components/home/home.component'
import { RegisterComponent } from './components/register/register.component'

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
    path: 'services',
    component: AdditionalserviceComponent
  },
  {
    path: 'sportplan',
    component: SportplanComponent
  }
]
