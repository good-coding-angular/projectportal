import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxLabelDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkMailboxLabelDetailComponent} from '../../../public-link/components/public-link-mailboxLabel-detail/public-link-mailboxLabel-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {MailboxLabelFacadeService} from '../../../shared/facades/mailboxLabel-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-mailboxLabel',
  templateUrl: './public-mailboxLabel.component.html',
  styleUrls: [
    './public-mailboxLabel.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxLabelComponent implements OnInit {
  public mailboxLabelFacadeService = inject(MailboxLabelFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxLabelTableColumns = signal<TableColumn[]>([]);
  public mailboxLabelData = signal<MailboxLabelDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
  }

  public loadData(): void {
    this.mailboxLabelFacadeService
      .getAllMailboxLabel()
      .subscribe(
        mailboxLabel => {
          this.mailboxLabelData.set(mailboxLabel);
        },
        (error) => {
          this.infoWindowService.showError(
            'There seems to be an error with the backend and a login is currently not possible. ' + error
          )
        }
      );
  }

  public initTable(): void {
    this.mailboxLabelTableColumns.set([
      new TableColumn({
        nameInData: nameof<MailboxLabelDto>(s => s.mailboxLabelId),
        title: 'MailboxLabelId',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxLabelDetailComponent>({
          componentType: PublicLinkMailboxLabelDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxLabelDto>(f => f.mailboxLabelId)),
          new KeyValuePair('mailboxLabelId', nameof<MailboxLabelDto>(f => f.mailboxLabelId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<MailboxLabelDto>(s => s.name),
        title: 'Name',
        dynamicComponent: new DynamicComponent<PublicLinkMailboxLabelDetailComponent>({
          componentType: PublicLinkMailboxLabelDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<MailboxLabelDto>(f => f.name)),
          new KeyValuePair('mailboxLabelId', nameof<MailboxLabelDto>(f => f.mailboxLabelId))
        ],
      }),

    ]);
  }
}
