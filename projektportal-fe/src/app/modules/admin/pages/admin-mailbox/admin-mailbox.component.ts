import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {MailboxFacadeService} from '../../../shared/facades/mailbox-facade.service';
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
  PublicLinkMailboxDetailComponent
} from '../../../public-link/components/public-link-mailbox-detail/public-link-mailbox-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-mailbox',
  templateUrl: './admin-mailbox.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-mailbox.component.scss',
  ],
})
export class AdminMailboxComponent extends SharedBaseComponent implements OnInit {
  public mailboxFacadeService = inject(MailboxFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxTableColumns = signal<TableColumn[]>([]);
  public mailboxData = signal<MailboxDto[]>([]);

  public mailboxFormSections = signal<FormSectionDeclaration[]>([]);
  public mailboxFormData = signal<MailboxDto>({});
  public mailboxFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
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

  public initTableActions(): void {
    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxTableDeleteEmitter.subscribe((mailboxId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.mailboxFacadeService.deleteMailbox(mailboxId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxTableEditEmitter.subscribe((mailboxId: any) => {
        this.edit.set(true);
        this.mailboxFormData.set(
          this.mailboxData().find(
            s => s.mailboxId === mailboxId
          ) ?? {}
        );
        this.initForm();
      }),
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
      new TableColumn({
        nameInData: nameof<MailboxDto>((s) => s.mailboxId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.mailboxTableDeleteEmitter,
            edit: this.mailboxTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<MailboxDto>((f) => f.mailboxId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.mailboxFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Status',
                  name: 'status',
                  value: this.mailboxFormData().status,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Date',
                  name: 'date',
                  value: this.mailboxFormData().date,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'SentBy',
                  name: 'sentBy',
                  value: this.mailboxFormData().sentBy,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'UserId',
                  name: 'userId',
                  value: this.mailboxFormData().userId,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Ehp',
                  name: 'ehp',
                  value: this.mailboxFormData().ehp,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
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
                  value: this.mailboxFormData().description,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
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
                  value: this.mailboxFormData().files,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public mailboxFormValueChanged(data: MailboxDto): void {
    this.mailboxFormData.set(data);
  }

  public mailboxFormSubmitted(): void {
    if (this.edit()) {
      this.mailboxFacadeService
        .updateMailbox(this.mailboxFormData()?.mailboxId ?? '', this.mailboxFormData())
        .subscribe(() => {
          this.mailboxFormData.set({} as unknown as MailboxDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.mailboxFacadeService
        .createMailbox(this.mailboxFormData())
        .subscribe(
          () => {
            this.mailboxFormData.set({} as unknown as MailboxDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}