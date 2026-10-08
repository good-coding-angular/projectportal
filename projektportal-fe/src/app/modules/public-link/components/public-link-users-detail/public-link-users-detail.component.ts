import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from "../public-link-base/public-link-base.component";

@Injectable()
@Component({
  selector: 'app-public-link-users-detail',
  templateUrl: './public-link-users-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class PublicLinkUsersDetailComponent extends PublicLinkBaseComponent {
  public override router = inject(Router);

  public override linkText = input<string>('Users Detail');

  public userId = input<string>();

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/users/detail/' + this.userId()];
  }
}