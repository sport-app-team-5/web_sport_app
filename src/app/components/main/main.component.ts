import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  standalone: true,
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor (private router: Router) {}

  ngOnInit () {
    this.start()
  }

  start () {
    return true
  }

  createService () {
    this.router.navigate(['/services'])
  }

  createNutritionalInfo () {
    this.router.navigate(['/nutritional-information'])
  }

  createProduct () {
    this.router.navigate(['/products'])
  }
}
