import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { HeaderMainService } from './header-main.service'
import { FormsModule } from "@angular/forms";
import { TranslateModule, TranslateService } from "@ngx-translate/core";

@Component({
  selector: 'app-header-main',
  templateUrl: './header-main.component.html',
  styleUrls: ['./header-main.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, TranslateModule]
})
export class HeaderMainComponent implements OnInit {
  isOpenMenu: boolean = false
  isActiveProfile: boolean = false
  role: string = ''
  menuKeyDown: boolean = false
  language: string = 'es';


  constructor(
    public router: Router,
    private headerMainService: HeaderMainService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    this.start()
    if (typeof localStorage !== 'undefined') {
      let idioma = localStorage.getItem('lang');
      if (idioma != null) {
        this.translate.setDefaultLang(idioma);
        this.language = idioma;
      } else {
        this.translate.setDefaultLang('es');
        this.language = 'es';
      }
    }
  }

  start() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.role = sessionStorage.getItem('role') ?? '';
    }
    return true
  }

  openMenuClass() {
    return {
      menu: true,
      'show-menu': this.isOpenMenu
    }
  }

  openMenu() {
    this.isOpenMenu = !this.isOpenMenu
  }

  closeSession() {
    this.isOpenMenu = !this.isOpenMenu
    sessionStorage.clear()
    this.router.navigate(['/'])
  }

  showProfile() {
    this.isOpenMenu = !this.isOpenMenu
    this.isActiveProfile = true;
    this.headerMainService.setIsActiveProfile(true);
  }

  handleKeyDown($event: KeyboardEvent) {
    this.menuKeyDown = true
  }

  switchLanguage(event: any): void {
    const value = event.target.value;
    this.translate.use(value);
    this.isOpenMenu = !this.isOpenMenu
    this.language = value;
    localStorage.setItem('lang', value);
  }
}
