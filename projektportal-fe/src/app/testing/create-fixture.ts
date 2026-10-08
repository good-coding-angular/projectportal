import {SpyLocation, MockLocationStrategy} from '@angular/common/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {provideHttpClientTesting} from '@angular/common/http/testing';
import {Type} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {CommonModule, LocationStrategy} from '@angular/common';
import {
  HttpClient,
  provideHttpClient,
  withInterceptorsFromDi,
  withXhr,
} from '@angular/common/http';
import {PreloadingStrategy, NoPreloading, provideRouter} from '@angular/router';
import {FormsModule} from '@angular/forms';
//import {MainStartpageComponent} from "../modules/main/pages/main-startpage/main-startpage.component";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const createComponentFixture = (componentType: Type<any>, providers: any[] = []): ComponentFixture<any> => {
  TestBed.configureTestingModule({
    declarations: [componentType],
    imports: [
      RouterTestingModule.withRoutes([
//        {
//          path: 'main',
//          component: MainStartpageComponent,
//        },
      ]),
      BrowserAnimationsModule,
      NgbModule,
      FormsModule,
      CommonModule,
    ],
    providers: [
      HttpClient,
      {
        provide: Location,
        useClass: SpyLocation,
      },
      {
        provide: LocationStrategy,
        useClass: MockLocationStrategy,
      },
      {
        provide: PreloadingStrategy,
        useExisting: NoPreloading,
      },
      provideRouter([
//        {
//          path: 'main',
//          component: MainStartpageComponent,
//        },
      ]),
      ...providers,
      provideHttpClient(withXhr(), withInterceptorsFromDi()),
      provideHttpClientTesting(),
    ],
  });

  return TestBed.createComponent(componentType);
};
