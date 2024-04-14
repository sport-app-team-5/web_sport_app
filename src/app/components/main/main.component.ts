import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
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

  createNewService () {
    this.router.navigate(['/services'])
  }

  goToNutritionalInfo () {
    this.router.navigate(['/nutritional-information'])
  }
}
