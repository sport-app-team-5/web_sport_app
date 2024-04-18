import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HeaderMainComponent } from '../header-main/header-main.component'
import {DashboardComponent} from "../dashboard/dashboard.component";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [CommonModule, HeaderMainComponent, DashboardComponent]
})
export class MainComponent implements OnInit {
  isOpenMenu: boolean = false
  isActiveMenu = 'home'
  constructor (private router: Router) {}

  ngOnInit () {
    this.start()
  }

  start () {
    return true
  }

  getButtonClassesMenuHome () {
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === 'home'
    }
  }
  getButtonClassesMenuSvg () {
    return {
      cell: true,
      'cell-active': this.isActiveMenu === 'home'
    }
  }

  getButtonClassesMenuProfileSvg () {
    return {
      cell: true,
      'cell-active': this.isActiveMenu === 'profile'
    }
  }

  getButtonClassesMenuProfile () {
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === 'profile'
    }
  }

  setMenuActive (value: any) {
    this.isActiveMenu = value
  }


  createService () {
    this.router.navigate(['/services'])
  }

  createNutritionalInfo () {
    this.router.navigate(['/nutritional-information'])
  }

  openMenuClass () {
    return {
      menu: true,
      'show-menu': this.isOpenMenu === true
    }
  }

  openMenu () {
    this.isOpenMenu = !this.isOpenMenu
  }
  closeSession () {
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

  createProduct () {
    this.router.navigate(['/products'])
  }
}
