import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NutritionalProfileListComponent } from '../nutritional-profile-list/nutritional-profile-list.component';
import { HeaderMainService } from '../header-main/header-main.service';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule, TranslateModule, NutritionalProfileListComponent],
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  selectedOption: string = 'sport';
  isActiveProfile: boolean = false;

  constructor(private headerMainService: HeaderMainService) { }

  ngOnInit() {
    this.selectedOption = 'sport';
    this.headerMainService.getIsActiveProfile().subscribe((profile) => {
      console.log(profile)
      this.isActiveProfile = profile;
    });
  }

  changeValueForm(value: string) {
    this.selectedOption = value;
  }
}
