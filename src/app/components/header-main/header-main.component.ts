import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderMainComponent implements OnInit {
  isOpenMenu: boolean = false
  constructor (private router: Router) {}

  ngOnInit () {
    this.start()
  }

  start () {
    return true
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
}
