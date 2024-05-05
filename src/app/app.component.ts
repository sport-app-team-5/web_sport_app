import { CommonModule } from '@angular/common'
import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'web_sport_app'
}
