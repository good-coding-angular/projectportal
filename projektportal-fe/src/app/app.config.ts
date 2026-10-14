import { APP_INITIALIZER, ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { provideTranslateHttpLoader } from '@ngx-translate/http-loader';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptorsFromDi  } from '@angular/common/http';
import { KeycloakBearerInterceptor, KeycloakService, provideKeycloak } from 'keycloak-angular';

function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'https://projektportal_auth/realms/projektportal', // URL Ihres Keycloak-Servers
        realm: 'projektportal',                     // Ihr Realm-Name
        clientId: '<your-client-id>'                // Ihre Client-ID aus Keycloak
      },
      initOptions: {
        onLoad: 'check-sso',                        // Prüft im Hintergrund, ob der User eingeloggt ist
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      },
      enableBearerInterceptor: true,                // Fügt das Token automatisch an HTTP-Requests an
      bearerPrefix: 'Bearer',
    });
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideTranslateService({
      loader: provideTranslateHttpLoader({
        prefix: '/assets/i18n/',
        suffix: '.json'
      }),
      fallbackLang: 'en',
      lang: 'en',
    }),
    {
      provide: APP_INITIALIZER,
      useFactory: initializeKeycloak,
      multi: true,
      deps: [KeycloakService]
    }
  ],
};

