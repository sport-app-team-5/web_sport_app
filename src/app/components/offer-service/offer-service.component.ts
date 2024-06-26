import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { OfferServiceService } from './offer-service.service';
import { AdittionaloffersService } from './adittionaloffers.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import {
  SuggestedTrainingListComponent
} from "../suggested-training/suggested-training-list/suggested-training-list.component";

@Component({
  selector: 'app-offer-service',
  standalone: true,
  imports: [CommonModule, TranslateModule, SuggestedTrainingListComponent],
  templateUrl: './offer-service.component.html',
  styleUrl: './offer-service.component.css'
})
export class OfferServiceComponent implements OnInit {

  @Input() setMenuActive: Function = () => { };
  @Input() isActiveMenu: string = 'home';
  isChecked: boolean = false;
  services: any[] = [];
  isAdditionalServiceActive: boolean = false;
  language: string = 'es';
  isSuggestedTrainingActive: boolean = false;

  constructor(private mainService: MainService,
    private checkService: OfferServiceService,
    public additionalService: AdittionaloffersService,
    public toastr: ToastrService,
    public translate: TranslateService
  ) { }

  ngOnInit(): void {
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

    if (typeof sessionStorage !== 'undefined') {
      let inside_home = sessionStorage.getItem('inside_home');
      if (inside_home != null) {
        this.isChecked = inside_home === 'true';
      }
    }

  }

  callCongrats() {
    this.toastr.success('Gracias por confiar en nosotros, pronto sera contactado por un agente', 'Contacto', {
      timeOut: 3000
    })
  }


  switchLanguage(language: string): void {
    this.translate.use(language)
    localStorage.setItem('lang', language);
  }

  changeMenuOption() {
    this.setMenuActive('profile');
    this.mainService.setMenuActive('profile');
  }

  getRecommendations() {
    this.setMenuActive('recommendation');
    this.mainService.setMenuActive('recommendation');
  }

  changeInsideHome($event: any) {
    const inputElement = $event.target as HTMLInputElement;
    this.isChecked = inputElement.checked;
    sessionStorage.setItem('inside_home', this.isChecked.toString())
  }

  getValueOfInsideHouse(value: any) {
    if (value) {
      return 'Si'
    }
    else {
      return 'No'
    }
  }

  getAdditionalServices() {
    this.isAdditionalServiceActive = true;
    console.log(this.isChecked)
    this.additionalService.getAdditionalServices(this.isChecked).subscribe({
      next: (services) => {
        this.services = services
      },
      error: (err) => {

        this.toastr.error('Error obteniendo los servicios adicionales', 'Error', {
          timeOut: 3000
        });
      }
    })
  }

  handleKeyDown($event: any) {
    console.log($event)
  }

  getSuggestedTrainings() {
    this.isSuggestedTrainingActive = true;
  }
}
