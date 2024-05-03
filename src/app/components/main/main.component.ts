import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';
import { ClasificationRiskGroupComponent } from '../clasification-risk-group/clasification-risk-group.component';
import { HeaderMainService } from '../header-main/header-main.service';
import {EventCreateComponent} from "../event/event-create/event-create.component";
import {EventListComponent} from "../event/event-list/event-list.component";
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
    EventCreateComponent,
    EventListComponent,
  ],
})
export class MainComponent implements OnInit {
  isOpenMenu: boolean = false;
  isActiveMenu = 'home';
  role: string | null = null;
  isEventsView = false;
  menuKeyDown: boolean = false;
  isActiveProfile: boolean = false;

  constructor(
    private router: Router,
    private headerMainService: HeaderMainService
  ) {}

  ngOnInit() {
    this.start();
    this.getSession();
    this.headerMainService.getIsActiveProfile().subscribe((profile) => {
      this.isActiveProfile = profile;
    });
  }

  getSession() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }
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

  setClassActiveSport(option: string) {
    console.log(option);
    return {
      'container-home': true,
      'active-button': this.isActiveMenu === option,
    };
  }

  getButtonClassesMenuSvg(option: string) {
    return {
      cell: true,
      'cell-active': this.isActiveMenu === option,
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
    this.isActiveProfile = false;
  }

  createService() {
    this.router.navigate(['/services']);
  }

  createNutritionalInfo() {
    this.router.navigate(['/nutritional-information']);
  }

  createTraining() {
    this.router.navigate(['/trainings']);
  }

  openMenuClass() {
    return {
      menu: true,
      'show-menu': this.isOpenMenu,
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

  handleKeyDown($event: KeyboardEvent) {
    this.menuKeyDown = true;
  }
}
