import { mergeApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { appConfig } from './app/app.config';
import { AppModule } from './app/app.module';

const bootstrapConfig = mergeApplicationConfig(appConfig, {
  providers: [provideZonelessChangeDetection()],
});

platformBrowserDynamic()
  .bootstrapModule(AppModule, {
    applicationProviders: bootstrapConfig.providers,
  })
  .catch((err) => console.error(err));