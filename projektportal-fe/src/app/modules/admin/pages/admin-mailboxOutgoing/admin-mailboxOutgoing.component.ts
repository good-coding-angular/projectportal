import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxOutgoingDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {MailboxOutgoingFacadeService} from '../../../shared/facades/mailboxOutgoing-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {SharedFormComponent} from '../../../shared/components/shared-form/shared-form.component';
import {FormSectionDeclaration} from '../../../shared/models/form-section-declaration.class';
import {FormFieldDeclaration} from '../../../shared/models/form-field-declaration.class';
import {SharedFormInputComponent} from '../../../shared/components/shared-form-input/shared-form-input.component';
import {
  SharedTableActionsComponent
} from '../../../shared/components/shared-table-actions/shared-table-actions.component';
import {SharedBaseComponent} from '../../../shared/components/shared-base/shared-base.component';
import {
  PublicLinkMailboxOutgoingDetailComponent
} from '../../../public-link/components/public-link-mailboxOutgoing-detail/public-link-mailboxOutgoing-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-mailboxOutgoing',
  templateUrl: './admin-mailboxOutgoing.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-mailboxOutgoing.component.scss',
  ],
})
export class AdminMailboxOutgoingComponent extends SharedBaseComponent implements OnInit {
  public mailboxOutgoingFacadeService = inject(MailboxOutgoingFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxOutgoingTableColumns = signal<TableColumn[]>([]);
  public mailboxOutgoingData = signal<MailboxOutgoingDto[]>([]);

  public mailboxOutgoingFormSections = signal<FormSectionDeclaration[]>([]);
  public mailboxOutgoingFormData = signal<MailboxOutgoingDto>({});
  public mailboxOutgoingFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxOutgoingTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxOutgoingTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
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

  public initTableActions(): void {
    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxOutgoingTableDeleteEmitter.subscribe((mailboxOutgoingId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.mailboxOutgoingFacadeService.deleteMailboxOutgoing(mailboxOutgoingId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxOutgoingTableEditEmitter.subscribe((mailboxOutgoingId: any) => {
        this.edit.set(true);
        this.mailboxOutgoingFormData.set(
          this.mailboxOutgoingData().find(
            s => s.mailboxOutgoingId === mailboxOutgoingId
          ) ?? {}
        );
        this.initForm();
      }),
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
      new TableColumn({
        nameInData: nameof<MailboxOutgoingDto>((s) => s.mailboxOutgoingId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.mailboxOutgoingTableDeleteEmitter,
            edit: this.mailboxOutgoingTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<MailboxOutgoingDto>((f) => f.mailboxOutgoingId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.mailboxOutgoingFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Status',
                  name: 'status',
                  value: this.mailboxOutgoingFormData().status,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Files',
                  name: 'files',
                  value: this.mailboxOutgoingFormData().files,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Receiver',
                  name: 'receiver',
                  value: this.mailboxOutgoingFormData().receiver,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Description',
                  name: 'description',
                  value: this.mailboxOutgoingFormData().description,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Category',
                  name: 'category',
                  value: this.mailboxOutgoingFormData().category,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Receipt',
                  name: 'receipt',
                  value: this.mailboxOutgoingFormData().receipt,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Datum',
                  name: 'datum',
                  value: this.mailboxOutgoingFormData().datum,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxOutgoingFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public mailboxOutgoingFormValueChanged(data: MailboxOutgoingDto): void {
    this.mailboxOutgoingFormData.set(data);
  }

  public mailboxOutgoingFormSubmitted(): void {
    if (this.edit()) {
      this.mailboxOutgoingFacadeService
        .updateMailboxOutgoing(this.mailboxOutgoingFormData()?.mailboxOutgoingId ?? '', this.mailboxOutgoingFormData())
        .subscribe(() => {
          this.mailboxOutgoingFormData.set({} as unknown as MailboxOutgoingDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.mailboxOutgoingFacadeService
        .createMailboxOutgoing(this.mailboxOutgoingFormData())
        .subscribe(
          () => {
            this.mailboxOutgoingFormData.set({} as unknown as MailboxOutgoingDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}