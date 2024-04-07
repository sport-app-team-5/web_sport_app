import { Component, OnInit } from '@angular/core'
import { Title } from '@angular/platform-browser'
import { Router, ActivatedRoute, ParamMap } from '@angular/router'
import { Observable } from 'rxjs'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor (private route: ActivatedRoute, private router: Router, private titleService:Title) {
    this.titleService.setTitle($localize `${this.titleService}`)
  }

  ngOnInit () {}

  goToRegitry () {
    this.router.navigate(['/register'])
  }
}
