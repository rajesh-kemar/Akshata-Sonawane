
import 'zone.js'
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';
import { HttpClientModule, provideHttpClient } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';


bootstrapApplication(AppComponent, {
  providers:[
    provideRouter(routes),
    importProvidersFrom(HttpClientModule),
    provideHttpClient()
  ]
})
