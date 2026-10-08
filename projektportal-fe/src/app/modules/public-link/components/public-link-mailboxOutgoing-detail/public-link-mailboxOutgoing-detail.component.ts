import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from "../public-link-base/public-link-base.component";

@Injectable()
@Component({
  selector: 'app-public-link-mailboxOutgoing-detail',
  templateUrl: './public-link-mailboxOutgoing-detail.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class PublicLinkMailboxOutgoingDetailComponent extends PublicLinkBaseComponent {
  public override router = inject(Router);

  public override linkText = input<string>('MailboxOutgoing Detail');

  public mailboxOutgoingId = input<string>();

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/mailboxOutgoing/detail/' + this.mailboxOutgoingId()];
  }
}