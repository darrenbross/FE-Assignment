import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { FronteggAppOptions } from "@frontegg/types";
import { FronteggAppModule } from "@frontegg/angular";
import { routes } from './app.routes';

const fronteggConfig: FronteggAppOptions = {
  contextOptions: {
    baseUrl: 'https://app-zpoy8smh4o3c.frontegg.com/oauth',
    clientId: '149c2e87-a126-44b6-8b46-f047bc0f596b',
  },
  authOptions: {
    // keepSessionAlive: true // Uncomment this in order to maintain the session alive
  },
  hostedLoginBox: true,
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    importProvidersFrom(FronteggAppModule.forRoot(fronteggConfig)),
  ],
};

