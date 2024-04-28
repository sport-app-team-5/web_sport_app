import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HeaderMainService } from './header-main.service'

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class HeaderMainComponent implements OnInit {
  isOpenMenu: boolean = false
  isActiveProfile: boolean = false
  role: string =''
  menuKeyDown: boolean = false

  constructor (private router: Router, private headerMainService: HeaderMainService) {}

  ngOnInit () {
    this.start()
   
  }

  start () {
    this.role = sessionStorage.getItem('role') ?? '';
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

  showProfile() {
    this.isActiveProfile = true;
    this.headerMainService.setIsActiveProfile(true);
  }

  handleKeyDown($event: KeyboardEvent) {
    this.menuKeyDown = true
  }
}
