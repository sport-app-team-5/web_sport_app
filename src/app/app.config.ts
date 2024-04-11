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
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export function HttpLoaderFactory (http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(),
    provideStore(),
    provideToastr({
      timeOut: 2000,
      positionClass: 'toast-top-right',
      preventDuplicates: true
    }),
    importProvidersFrom(BrowserAnimationsModule),
    {
      provide: TranslateLoader,
      useFactory: createTranslateLoader,
      deps: [HttpClient]
    },
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
          provide: TranslateLoader,
          useFactory: HttpLoaderFactory,
          deps: [HttpClient]
        }
      })
    )
  ]
}
