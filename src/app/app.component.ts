import { CommonModule } from '@angular/common'
import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { TranslateModule } from '@ngx-translate/core'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, TranslateModule],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'web_sport_app'
}
