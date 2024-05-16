import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';
import { ClasificationRiskGroupComponent } from '../clasification-risk-group/clasification-risk-group.component';
import { HeaderMainService } from '../header-main/header-main.service';
import { CalendarComponent } from '../calendar/calendar.component';
import {EventCreateComponent} from "../event/event-create/event-create.component";
import {EventListComponent} from "../event/event-list/event-list.component";
import {TrainingListComponent} from "../training/training-list/training-list.component";
import { OfferServiceComponent } from '../offer-service/offer-service.component';
import { MainService } from './main.service';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { ScheduleAppointmentComponent } from "../schedule-appointment/schedule-appointment.component";
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
        CalendarComponent,
        EventCreateComponent,
        EventListComponent,
        TrainingListComponent,
        OfferServiceComponent,
        RecommendationComponent,
        ScheduleAppointmentComponent
    ]
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
    private headerMainService: HeaderMainService,
    private mainService: MainService
  ) {}

  ngOnInit() {
    this.start();
    this.getSession();
    this.headerMainService.getIsActiveProfile().subscribe((profile) => {
      this.isActiveProfile = profile;
    });
    this.mainService.activeMenu$.subscribe(value => {
      this.isActiveMenu = value;
      this.isActiveProfile = false;
    });

    if(this.role==="DEPO"){
      this.setClassActiveSport('home');
      this.setMenuActive('home');
    }else{
      this.setClassActiveSport('events');
      this.setMenuActive('events');
    }
  }

  getSession() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }
  }

  start() {
    return true;
  }

  setClassActiveSport(option: string) {
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
