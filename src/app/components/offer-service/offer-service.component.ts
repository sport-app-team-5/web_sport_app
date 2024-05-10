import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { MainService } from '../main/main.service';
import { OfferServiceService } from './offer-service.service';
import { AdittionaloffersService } from './adittionaloffers.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-offer-service',
  standalone: true,
  imports: [CommonModule, TranslateModule],
  templateUrl: './offer-service.component.html',
  styleUrl: './offer-service.component.css'
})
export class OfferServiceComponent implements OnInit {
  @Input() setMenuActive: Function = () => { };
  @Input() isActiveMenu: string = 'home';
  isChecked: boolean = false;
  services: any[] = [];
  isAdditionalServiceActive: boolean = false;

  constructor(private mainService: MainService,
    private checkService: OfferServiceService,
    private additionalService: AdittionaloffersService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.switchLanguage('es');
  }

  switchLanguage(language: string): void {
    this.translate.use(language)
  }

  changeMenuOption() {
    this.setMenuActive('profile');
    this.mainService.setMenuActive('profile');
  }


  changeInsideHome($event: any) {
    
    this.isChecked = this.isChecked===true ? false : true
    this.checkService.changeCheck(this.isChecked);
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

  handleKeyDown($event:any){
    console.log($event)
  }
}
