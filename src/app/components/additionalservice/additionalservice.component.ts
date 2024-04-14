import { CommonModule } from '@angular/common'
import { Component, OnInit } from '@angular/core'
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms'
import { TranslateModule, TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { AdditionalServiceService } from './additional-service.service'
import { Router } from '@angular/router'

@Component({
    selector: 'app-additionalservice',
    templateUrl: './additionalservice.component.html',
    styleUrls: ['./additionalservice.component.css'],
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, TranslateModule],
    providers: [AdditionalServiceService]
})
export class AdditionalserviceComponent implements OnInit {
    currentStep: any = 1
    formData: any = {}

    type: any = null
    cost = new FormControl('', [Validators.required])
    description = new FormControl('', [Validators.required])
    is_active: boolean = true

    constructor (
        private toastr: ToastrService,
        private translate: TranslateService,
        private adittionalService: AdditionalServiceService,
        private router: Router
    ) {}

    ngOnInit () {
        this.switchLanguage('es')
    }

    changeValueForm (e: any) {
        const name = e.target.name
        const value = e.target.value
        this.formData[name] = value
    }
    switchLanguage (language: string): void {
        this.translate.use(language)
    }
    setServiceType (value: any) {
        this.type = value
        this.formData['type'] = value
    }

    backStep () {
        if (this.currentStep > 1) {
            this.currentStep--
        }
    }

    nextStep () {
        if (this.currentStep === 1) {
            if (this.validateStep1()) {
                this.currentStep++
            }
        } else if (this.currentStep === 2) {
            if (this.validateStep2()) {
                this.currentStep++
            }
        } else if (this.currentStep === 3) {
            if (this.validateStep3()) {
                this.saveServiceData()
            }
        }
    }

    validateStep1 () {
        return this.type
    }

    validateStep2 () {
        return this.cost && this.cost.errors === null
    }

    validateStep3 () {
        return this.description && this.description.errors === null
    }

    saveServiceData () {
        this.formData['is_active'] = this.is_active
        this.adittionalService
            .registerAdditionalService(this.formData)
            .subscribe({
                next: this.handleUpdateResponse.bind(this),
                error: this.handleError.bind(this)
            })
    }

    handleUpdateResponse (response: any) {
        this.router.navigate(['/home'])
    }

    handleError (error: any) {
        this.toastr.error('Error registrando el servicio', 'Error', {
            timeOut: 3000
        })
    }
}
