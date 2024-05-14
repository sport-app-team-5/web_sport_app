import { Component, OnInit } from '@angular/core'
import { TranslateService,TranslateModule } from '@ngx-translate/core'


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: true,
   imports: [TranslateModule]
})
export class HomeComponent implements OnInit {
  constructor (
    private translate: TranslateService
  ) {}

  ngOnInit () {
    this.translate.setDefaultLang('es');
  }

  switchLanguage (event: any): void {
    const value = event.target.value;
    this.translate.use(value)
  }
}
