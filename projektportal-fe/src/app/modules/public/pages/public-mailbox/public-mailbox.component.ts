import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkMailboxDetailComponent} from '../../../public-link/components/public-link-mailbox-detail/public-link-mailbox-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {MailboxFacadeService} from '../../../shared/facades/mailbox-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-mailbox',
  templateUrl: './public-mailbox.component.html',
  styleUrls: [
    './public-mailbox.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxComponent implements OnInit {
  public mailboxFacadeService = inject(MailboxFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxTableColumns = signal<TableColumn[]>([]);
  public mailboxData = signal<MailboxDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
  }

  public loadData(): void {
    this.mailboxFacadeService
      .getAllMailbox()
      .subscribe(
        mailbox => {
          this.mailboxData.set(mailbox);
        },
        (error) => {
          this.infoWindowService.showError(
            'There seems to be an error with the backend and a login is currently not possible. ' + error
          )
        }
      );
  }

  public initTable(): void {
    this.mailboxTableColumns.set([
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.status),
        title: 'Status',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.status)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.mailboxId),
        title: 'MailboxId',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.mailboxId)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.date),
        title: 'Date',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.date)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.sentBy),
        title: 'SentBy',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.sentBy)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.userId),
        title: 'UserId',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.userId)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.ehp),
        title: 'Ehp',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.ehp)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.description),
        title: 'Description',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.description)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxDto>(s => s.files),
        title: 'Files',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxDetailComponent>({
          componentType: PublicLinkMailboxDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxDto>(f => f.files)),
          new KeyValuePair('mailboxId', nameof<MailboxDto>(f => f.mailboxId))
        ],
      }),

    ]);
  }
}
