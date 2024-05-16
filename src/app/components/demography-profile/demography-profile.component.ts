import {Component, OnInit} from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule, TranslateService} from "@ngx-translate/core";
import {ToastrService} from "ngx-toastr";
import {DemographyProfileService} from "./demography-profile.service";
import {DemographyProfile} from "./demography-profile";

@Component({
  selector: 'app-demography-profile',
  standalone: true,
    imports: [
        NgForOf,
        TranslateModule
    ],
  templateUrl: './demography-profile.component.html',
  styleUrl: './demography-profile.component.css'
})
export class DemographyProfileComponent implements OnInit {
  language: string = 'es';
  constructor (
    private demographyProfileService: DemographyProfileService,
    private toastr: ToastrService,
    public translate: TranslateService
  ) {}

  profile: DemographyProfile | undefined
  user: any

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
    this.getProfile()
    this.getUser()
  }

  switchLanguage (language: string): void {
    this.translate.use(language);
    localStorage.setItem('lang', language);
  }

  getProfile(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token= sessionStorage.getItem('access_token')
      this.demographyProfileService.getProfile(token).subscribe({
        next: (response) => {this.profile = response},
        error: () => {
          this.toastr.error('Error obteniendo el perfil', 'Error', {
            timeOut: 3000
          });
        }
      });
    }
  }

  getUser(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token= sessionStorage.getItem('access_token')
      const user_id= sessionStorage.getItem('user_id')
      this.demographyProfileService.getUser(token, user_id).subscribe({
        next: (response) => {this.user = response},
        error: () => {
          this.toastr.error('Error obteniendo el usurio', 'Error', {
            timeOut: 3000
          });
        }
      });
    }
  }
}
