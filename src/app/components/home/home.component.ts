import { Component, OnInit } from '@angular/core'
import { TranslateService, TranslateModule } from '@ngx-translate/core'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../offer-service/offer-service.component.css'],
  standalone: true,
  imports: [TranslateModule]
})
export class HomeComponent implements OnInit {
  language: string = 'es';

  constructor(
    private translate: TranslateService
  ) { }

  ngOnInit() {
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

  switchLanguage(event: any): void {
    const value = event.target.value;
    this.translate.use(value)
    localStorage.setItem('lang', value);
  }
}
