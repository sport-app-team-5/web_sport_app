import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HeaderMainComponent } from '../header-main/header-main.component';
import { ProfileInformationComponent } from '../profile-information/profile-information.component';
import { ClasificationRiskGroupComponent } from '../clasification-risk-group/clasification-risk-group.component';
import { HeaderMainService } from '../header-main/header-main.service';
import { CalendarComponent } from '../calendar/calendar.component';
import { EventCreateComponent } from "../event/event-create/event-create.component";
import { EventListComponent } from "../event/event-list/event-list.component";
import { TrainingListComponent } from "../training/training-list/training-list.component";
import { OfferServiceComponent } from '../offer-service/offer-service.component';
import { MainService } from './main.service';
import { RecommendationComponent } from '../recommendation/recommendation.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProductComponent } from '../product/product.component';
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
    TranslateModule,
    ProductComponent
  ],
})
export class MainComponent implements OnInit {
  isOpenMenu: boolean = false;
  isActiveMenu = '';
  role: string | null = null;
  isEventsView = false;
  menuKeyDown: boolean = false;
  isActiveProfile: boolean = false;
  language: string = '';
  isCreatingProduct: boolean = false;

  constructor(
    private router: Router,
    private headerMainService: HeaderMainService,
    private mainService: MainService,
    public translate: TranslateService
  ) { }

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      let idioma = localStorage.getItem('lang');
      if (idioma != null) {
        this.translate.setDefaultLang(idioma);
        this.language = idioma;
      } else {
        this.translate.setDefaultLang('es');
        this.language = 'es';
      }
    }

    this.getSession();
    this.headerMainService.getIsActiveProfile().subscribe((profile) => {
      this.isActiveProfile = profile;
    });
    this.mainService.activeMenu$.subscribe(value => {
      this.isActiveMenu = value;
      this.isActiveProfile = false;
    });
    this.setClassActiveSport('home')
    this.setMenuActive('home');

  }

  getSession() {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      this.role = sessionStorage.getItem('role');
    }
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
    this.isCreatingProduct = true;

  }

  handleKeyDown($event: KeyboardEvent) {
    this.menuKeyDown = true;
  }

  closeWindow(){
    this.isCreatingProduct=false;
  }
}
