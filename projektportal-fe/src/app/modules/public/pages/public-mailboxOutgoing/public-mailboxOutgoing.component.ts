import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxOutgoingDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkMailboxOutgoingDetailComponent} from '../../../public-link/components/public-link-mailboxOutgoing-detail/public-link-mailboxOutgoing-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {MailboxOutgoingFacadeService} from '../../../shared/facades/mailboxOutgoing-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-mailboxOutgoing',
  templateUrl: './public-mailboxOutgoing.component.html',
  styleUrls: [
    './public-mailboxOutgoing.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxOutgoingComponent implements OnInit {
  public mailboxOutgoingFacadeService = inject(MailboxOutgoingFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxOutgoingTableColumns = signal<TableColumn[]>([]);
  public mailboxOutgoingData = signal<MailboxOutgoingDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
  }

  public loadData(): void {
    this.mailboxOutgoingFacadeService
      .getAllMailboxOutgoing()
      .subscribe(
        mailboxOutgoing => {
          this.mailboxOutgoingData.set(mailboxOutgoing);
        },
        (error) => {
          this.infoWindowService.showError(
            'There seems to be an error with the backend and a login is currently not possible. ' + error
          )
        }
      );
  }

  public initTable(): void {
    this.mailboxOutgoingTableColumns.set([
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.status),
        title: 'Status',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.status)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.files),
        title: 'Files',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.files)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.mailboxOutgoingId),
        title: 'MailboxOutgoingId',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.receiver),
        title: 'Receiver',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.receiver)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.description),
        title: 'Description',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.description)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.category),
        title: 'Category',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.category)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.receipt),
        title: 'Receipt',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.receipt)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>(s => s.datum),
        title: 'Datum',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxOutgoingDetailComponent>({
          componentType: PublicLinkMailboxOutgoingDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxOutgoingDto>(f => f.datum)),
          new KeyValuePair('mailboxOutgoingId', nameof<MailboxOutgoingDto>(f => f.mailboxOutgoingId))
        ],
      }),

    ]);
  }
}
