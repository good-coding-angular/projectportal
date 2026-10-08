import {Component, inject, Injectable, input, ChangeDetectionStrategy} from '@angular/core';
import {Router} from "@angular/router";
import {PublicLinkBaseComponent} from '../../../public-link/components/public-link-base/public-link-base.component';

@Injectable()
@Component({
  selector: 'app-admin-link-mailboxOutgoing',
  templateUrl: './admin-link-mailboxOutgoing.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkBaseComponent,
  ],
})
export class AdminLinkMailboxOutgoingComponent extends PublicLinkBaseComponent {
  public override linkText = input<string>('MailboxOutgoing');

  public override router = inject(Router);

  public openLink(): void {
    this.router.navigate(this.getRouterLink());
  }

  public getRouterLink(): string[] {
    return ['/admin/mailboxOutgoing'];
  }
}