import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { NutritionalProfileListComponent } from '../nutritional-profile-list/nutritional-profile-list.component'
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  constructor (private router: Router, private nutritionalProfileListComponent: NutritionalProfileListComponent) {}

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
