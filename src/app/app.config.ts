import { ApplicationConfig, importProvidersFrom } from '@angular/core'
import { provideRouter } from '@angular/router'
import { routes } from './app.routes'
import { provideClientHydration } from '@angular/platform-browser'
import { HttpClient, provideHttpClient } from '@angular/common/http'
import { provideStore } from '@ngrx/store'
import { provideToastr } from 'ngx-toastr'
import {
  BrowserAnimationsModule
} from '@angular/platform-browser/animations'
import { TranslateHttpLoader } from '@ngx-translate/http-loader'
import { TranslateLoader, TranslateModule } from '@ngx-translate/core'

export function createTranslateLoader (http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://cdn-sport-app.s3.amazonaws.com/', '.json')
}

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader(http, 'https://cdn-sport-app.s3.amazonaws.com/', '.json')
}


