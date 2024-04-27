import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SportsInformationService } from './sports-information.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-sports-information',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TranslateModule,
    NgMultiSelectDropDownModule,
  ],
  templateUrl: './sports-information.component.html',
  styleUrls: ['./sports-information.component.css'],
  providers: [SportsInformationService],
})
export class SportsInformationComponent implements OnInit {
  currentStep: any = 1;
  time_dedication_sport: any = null;
  sport_preference: any = '';
  exercise_experience: any = null;
  activateErrorMessageForTimeDedications: boolean = false;
  activateErrorMessageForSportPreference: boolean = false;
  activateErrorMessageForExperience: boolean = false;
  formData: any = {};
  birth_year = new FormControl('', [Validators.required]);
  weight = new FormControl('', [Validators.required]);
  height = new FormControl('', [Validators.required]);
  allergies_list: any[] = [
    { id: 1, name: 'Fractuas miembro superior' },
    { id: 2, name: 'Fracturas miembro inferiores' },
    { id: 3, name: 'Dolor en miembros superiores' },
    { id: 4, name: 'Dolor en miembros inferiores' },
    { id: 5, name: ' Dolor en la espalda' },
    { id: 6, name: 'Quemaduras en la espalda' },
    { id: 7, name: 'Ampollas miembros inferiores' },
    { id: 8, name: 'Ampollas miembros superiores' },
  ];
  injuries: Array<number> = [];

  validateInjuries: boolean = false;

  dropdownSettings = {
    idField: 'id',
    textField: 'name',
    enableCheckAll: false,
    itemsShowLimit: 2,
  };
  selectedOptions: any;

  onItemSelect(item: any) {
    this.injuries.push(item.id);
    this.validateInjuries = false;
  }

  onItemDeSelect(item: any) {
    this.injuries = this.injuries.filter((id) => id !== item.id);
  }

  constructor(
    private router: Router,
    private registerSportInformation: SportsInformationService,
    private toastr: ToastrService,
    private translate: TranslateService
  ) {}

  ngOnInit() {
    this.switchLanguage('es');
  }

  switchLanguage(language: string): void {
    this.translate.use(language);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }

  setDedicationTime(value: string) {
    this.time_dedication_sport = value;
    this.activateErrorMessageForTimeDedications = false;
  }

  setExperience(value: string) {
    this.exercise_experience = value;
    this.activateErrorMessageForExperience = false;
  }

  setSportPreference(value: string) {
    this.sport_preference = value;
    this.activateErrorMessageForSportPreference = false;
  }

  getClassDedicationTime(value: any) {
    return {
      'question-button': true,
      'active-button': this.time_dedication_sport === value,
    };
  }

  getClassSportPreference(value: any) {
    return {
      'question-button': true,
      'active-button': this.sport_preference === value,
    };
  }

  getClassExperience(value: any) {
    return {
      'question-button': true,
      'active-button': this.exercise_experience === value,
    };
  }

  changeValueForm(e: any) {
    const name = e.target.name;
    const value = e.target.value;

    this.formData[name] = value;
  }

  backStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  nextStep() {
    if (this.currentStep === 1) {
      if (this.validateStep1()) {
        this.currentStep++;
      }
    } else if (this.currentStep === 2) {
      if (this.validateStep2()) {
        this.currentStep++;
      }
    } else if (this.currentStep === 3) {
      if (this.validateStep3()) {
        this.currentStep++;
      } else {
        this.birth_year.markAllAsTouched();
      }
    } else if (this.currentStep === 4) {
      if (this.validateStep4()) {
        this.currentStep++;
      } else {
        this.weight.markAllAsTouched();
      }
    } else if (this.currentStep === 5) {
      if (this.validateStep5()) {
        this.currentStep++;
      } else {
        this.height.markAllAsTouched();
      }
    } else if (this.currentStep === 6) {
      if (this.validateStep6()) {
        this.currentStep++;
      } else {
        this.height.markAllAsTouched();
      }
    } else {
      if (this.validateStep7()) {
        this.saveData();
      } else {
        this.height.markAllAsTouched();
      }
    }
  }

  saveData() {
    const user_id = sessionStorage.getItem('user_id');
    let data = {
      birth_year: this.birth_year.value,
      height: this.height.value,
      weight: this.weight.value,
      id: user_id,
      injuries: this.injuries,
      sport_preference: this.sport_preference,
      exercise_experience: this.exercise_experience,
      time_dedication_sport: this.time_dedication_sport,
    };
    this.registerSportInformation.createSportProfile(data, user_id).subscribe({
      next: () => {
        this.toastr.success('Deportista actualizado éxitosamente', 'Exitoso', {
          timeOut: 3000
        })
      },
      error: (error) => {
        console.log(error)
        this.toastr.error('Error actualizando la información', 'Error', {
          timeOut: 3000
        })
      },
    });
  }

  validateStep1() {
    let valid = false;
    if (this.time_dedication_sport) {
      valid = true;
    } else {
      this.activateErrorMessageForTimeDedications = true;
    }
    return valid;
  }

  validateStep2() {
    let valid = false;
    if (this.exercise_experience) {    
      valid = true;
    } 
    this.activateErrorMessageForExperience = !valid;
    return valid;
  }

  validateStep3() {
    return !!this.birth_year.value && this.birth_year.errors === null;
  }

  validateStep4() {
    return !!this.weight.value && this.weight.errors === null;
  }

  validateStep5() {
    return !!this.height.value && this.height.errors === null;
  }

  validateStep6() {
    if (this.sport_preference) {
      this.activateErrorMessageForSportPreference = false;
      return true;
    } else {
      this.activateErrorMessageForSportPreference = true;
      return false;
    }
  }

  validateStep7() {
    if (this.injuries.length > 0) {
      return true;
    } else {
      this.validateInjuries = true;
      return false;
    }
  }
}
