import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from "../public-link-base/public-link-base.component";

@Injectable()
@Component({
  selector: 'app-public-link-services',
  templateUrl: './public-link-services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class PublicLinkServicesComponent extends PublicLinkBaseComponent {
  public override router = inject(Router);

  public override linkText = input<string>('Services');

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/services'];
  }
}