// import 'zone.js';
// import { bootstrapApplication } from '@angular/platform-browser';
// import { AppComponent } from './app/app';
// import { provideRouter } from '@angular/router';
// import { routes } from './app/app.routes';
// import { provideHttpClient } from '@angular/common/http'; // standalone provider

// bootstrapApplication(AppComponent, {
//   providers: [
//     provideRouter(routes),
//     provideHttpClient() 
//   ]
// })
// .catch(err => console.error(err));
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { appConfig } from './app/app.config';
import { provideHttpClient, withFetch } from '@angular/common/http';

// Add provideHttpClient(withFetch()) to your providers
const updatedAppConfig = {
  ...appConfig,
  providers: [
    ...(appConfig.providers || []),
    provideHttpClient(withFetch())
  ]
};

bootstrapApplication(AppComponent, updatedAppConfig)
  .catch(err => console.error(err));