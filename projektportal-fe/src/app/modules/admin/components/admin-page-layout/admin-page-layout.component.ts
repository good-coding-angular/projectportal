import {Component, Injectable, ChangeDetectionStrategy} from '@angular/core';
import {AdminLinkMailboxLabelComponent} from '../../../admin-link/components/admin-link-mailboxLabel/admin-link-mailboxLabel.component';
import {AdminLinkUsersComponent} from '../../../admin-link/components/admin-link-users/admin-link-users.component';
import {AdminLinkServicesComponent} from '../../../admin-link/components/admin-link-services/admin-link-services.component';
import {AdminLinkMailboxOutgoingComponent} from '../../../admin-link/components/admin-link-mailboxOutgoing/admin-link-mailboxOutgoing.component';
import {AdminLinkMailboxComponent} from '../../../admin-link/components/admin-link-mailbox/admin-link-mailbox.component';
import {AdminLinkSystemStatusComponent} from '../../../admin-link/components/admin-link-systemStatus/admin-link-systemStatus.component';

@Injectable()
@Component({
  selector: 'app-admin-page-layout',
  templateUrl: './admin-page-layout.component.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-page-layout.component.scss',
  ],
  imports: [
    AdminLinkMailboxLabelComponent,
    AdminLinkUsersComponent,
    AdminLinkServicesComponent,
    AdminLinkMailboxOutgoingComponent,
    AdminLinkMailboxComponent,
    AdminLinkSystemStatusComponent
  ],
})
export class AdminPageLayoutComponent {

}