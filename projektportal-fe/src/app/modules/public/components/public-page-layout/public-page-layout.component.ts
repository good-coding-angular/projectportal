import {Component, Injectable, ChangeDetectionStrategy} from '@angular/core';
import {PublicLinkMailboxLabelComponent} from '../../../public-link/components/public-link-mailboxLabel/public-link-mailboxLabel.component';
import {PublicLinkUsersComponent} from '../../../public-link/components/public-link-users/public-link-users.component';
import {PublicLinkServicesComponent} from '../../../public-link/components/public-link-services/public-link-services.component';
import {PublicLinkMailboxOutgoingComponent} from '../../../public-link/components/public-link-mailboxOutgoing/public-link-mailboxOutgoing.component';
import {PublicLinkMailboxComponent} from '../../../public-link/components/public-link-mailbox/public-link-mailbox.component';
import {PublicLinkSystemStatusComponent} from '../../../public-link/components/public-link-systemStatus/public-link-systemStatus.component';

@Injectable()
@Component({
  selector: 'app-public-page-layout',
  templateUrl: './public-page-layout.component.html',
  styleUrls: [
    './public-page-layout.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicLinkMailboxLabelComponent,
    PublicLinkUsersComponent,
    PublicLinkServicesComponent,
    PublicLinkMailboxOutgoingComponent,
    PublicLinkMailboxComponent,
    PublicLinkSystemStatusComponent
  ],
})
export class PublicPageLayoutComponent {}