import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from "../public-link-base/public-link-base.component";

@Injectable()
@Component({
  selector: 'app-public-link-mailbox-detail',
  templateUrl: './public-link-mailbox-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class PublicLinkMailboxDetailComponent extends PublicLinkBaseComponent {
  public override router = inject(Router);

  public override linkText = input<string>('Mailbox Detail');

  public mailboxId = input<string>();

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/mailbox/detail/' + this.mailboxId()];
  }
}