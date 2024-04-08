import { Component, OnInit } from '@angular/core'
import { Router, ActivatedRoute } from '@angular/router'
import {
  TranslateLoader,
  TranslateService,
  TranslateStore
} from '@ngx-translate/core'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
  imports: [TranslateModule],
  providers: [TranslateService, TranslateStore]
})
export class HomeComponent implements OnInit {
  constructor (
    private route: ActivatedRoute,
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
}
