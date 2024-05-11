import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {TranslateModule} from "@ngx-translate/core";

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
export class DemographyProfileComponent {

}
