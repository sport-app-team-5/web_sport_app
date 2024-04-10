import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import {
  TranslateService,TranslateModule
} from '@ngx-translate/core'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
   imports: [TranslateModule]
})
export class HomeComponent implements OnInit {
  constructor (
    private router: Router,
    private translate: TranslateService
  ) {}

  ngOnInit () {
    this.switchLanguage('es')
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }
  getLocalizedText (key: string): string {
    return this.translate.instant(key)
  }

  goToRegitry () {
    this.router.navigate(['/register'])
  }
  goToLogin () {
    this.router.navigate(['/login'])
  }
}
