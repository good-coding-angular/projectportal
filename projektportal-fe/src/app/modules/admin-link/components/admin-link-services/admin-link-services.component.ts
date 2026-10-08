import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from '../../../public-link/components/public-link-base/public-link-base.component';

@Injectable()
@Component({
  selector: 'app-admin-link-services',
  templateUrl: './admin-link-services.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class AdminLinkServicesComponent extends PublicLinkBaseComponent {
  public override linkText = input<string>('Services');

  public override router = inject(Router);

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/admin/services'];
  }
}