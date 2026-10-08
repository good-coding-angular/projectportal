import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {App} from './app';
import {provideHttpClient, withInterceptorsFromDi, withXhr} from "@angular/common/http";
import {BASE_PATH} from "./modules/backend";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ToastrModule} from "ngx-toastr";

@NgModule({
  bootstrap: [App],
  imports: [
    App,
    BrowserModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    NgbModule,
  ],
  providers: [
    {
      provide: BASE_PATH,
      useValue: ''
    },
    provideHttpClient(withXhr(), withInterceptorsFromDi()),
  ]
})
export class AppModule {
}
