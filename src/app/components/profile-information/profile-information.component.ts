import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-information',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-information.component.html',
  styleUrls: ['./profile-information.component.css']
})
export class ProfileInformationComponent implements OnInit {

  selectedOption: string = '';

  constructor() { }

  ngOnInit() {
    this.selectedOption = "Perfil Alimenticio";
  }

}
