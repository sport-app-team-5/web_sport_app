import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';
import { ClasificationRiskGroupComponent } from '../clasification-risk-group/clasification-risk-group.component';
import { ThirdPartyCreateEventComponent } from '../../third-party/third-party-create-event/third-party-create-event.component';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    HeaderMainComponent,
    ProfileInformationComponent,
    ClasificationRiskGroupComponent,
    ThirdPartyCreateEventComponent
  ],
})
export class MainComponent implements OnInit {
  isOpenMenu: boolean = false;
  isActiveMenu = 'home';
  role = sessionStorage.getItem('role');
  creatingEvent = false;
  menuKeyDown: boolean = false
  constructor(private router: Router) {}

  ngOnInit() {
    this.start();
  }

  start() {
    return true;
  }

  getButtonClassesMenuHome() {
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === 'home',
    };
  }

  getActiveOption(option:string){
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === option,
    };
  }

  setClassActiveSport(option:string){
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === option,
    };
  }

  getButtonClassesMenuSvg() {
    return {
      cell: true,
      'cell-active': this.isActiveMenu === 'home',
    };
  }

  getActiveSvg(option:string){
    return {
      cell: true,
      'cell-active': this.isActiveMenu === option
    };
  }

  getButtonClassesMenuProfileSvg() {
    return {
      cell: true,
      'cell-active': this.isActiveMenu === 'profile',
    };
  }

  getButtonClassesMenuProfile() {
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === 'profile',
    };
  }

  setMenuActive(value: any) {
    this.isActiveMenu = value;
  }

  createService() {
    this.router.navigate(['/services']);
  }

  createNutritionalInfo() {
    this.router.navigate(['/nutritional-information']);
  }

  createExercise() {
    this.router.navigate(['/exercise']);
  }

  openMenuClass() {
    return {
      menu: true,
      'show-menu': this.isOpenMenu === true,
    };
  }

  openMenu() {
    this.isOpenMenu = !this.isOpenMenu;
  }
  closeSession() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  createProduct() {
    this.router.navigate(['/products']);
  }

  createEvent() {
    this.creatingEvent=true
    // this.router.navigate(['/events']);
  }

  handleKeyDown($event: KeyboardEvent) {
    console.log($event)
    this.menuKeyDown = true
  }
}
