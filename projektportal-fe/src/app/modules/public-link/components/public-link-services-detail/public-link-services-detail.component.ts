import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from "../public-link-base/public-link-base.component";

@Injectable()
@Component({
  selector: 'app-public-link-services-detail',
  templateUrl: './public-link-services-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class PublicLinkServicesDetailComponent extends PublicLinkBaseComponent {
  public override router = inject(Router);

  public override linkText = input<string>('Services Detail');

  public serviceId = input<string>();

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/services/detail/' + this.serviceId()];
  }
}