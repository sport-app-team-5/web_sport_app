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
  constructor (
    private demographyProfileService: DemographyProfileService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  profile: DemographyProfile | undefined

  ngOnInit() {
    this.switchLanguage('es')
    this.getProfile()
  }

  switchLanguage (language: string): void {
    this.translate.use(language)
  }

  getProfile(): void {
    if (typeof window !== 'undefined' && window.sessionStorage) {
      const token= sessionStorage.getItem('acces_token')
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
}
