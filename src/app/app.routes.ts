import { Routes } from '@angular/router'
import { UsersComponent } from './components/users/users.component'
import { AdditionalserviceComponent } from './components/additionalservice/additionalservice.component'
import { SportplanComponent } from './components/sportplan/sportplan.component'

export const routes: Routes = [
  {
    path: 'login',
    component: UsersComponent
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
