import { Component } from '@angular/core'
import { RouterOutlet } from '@angular/router'
import { provideToastr } from 'ngx-toastr'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'web_sport_app'
}
