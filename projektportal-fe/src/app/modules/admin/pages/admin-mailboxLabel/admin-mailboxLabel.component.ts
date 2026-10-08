import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {MailboxLabelDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {MailboxLabelFacadeService} from '../../../shared/facades/mailboxLabel-facade.service';
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
  PublicLinkMailboxLabelDetailComponent
} from '../../../public-link/components/public-link-mailboxLabel-detail/public-link-mailboxLabel-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-mailboxLabel',
  templateUrl: './admin-mailboxLabel.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-mailboxLabel.component.scss',
  ],
})
export class AdminMailboxLabelComponent extends SharedBaseComponent implements OnInit {
  public mailboxLabelFacadeService = inject(MailboxLabelFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public mailboxLabelTableColumns = signal<TableColumn[]>([]);
  public mailboxLabelData = signal<MailboxLabelDto[]>([]);

  public mailboxLabelFormSections = signal<FormSectionDeclaration[]>([]);
  public mailboxLabelFormData = signal<MailboxLabelDto>({});
  public mailboxLabelFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxLabelTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public mailboxLabelTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
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

  public initTableActions(): void {
    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxLabelTableDeleteEmitter.subscribe((mailboxLabelId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.mailboxLabelFacadeService.deleteMailboxLabel(mailboxLabelId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.mailboxLabelTableEditEmitter.subscribe((mailboxLabelId: any) => {
        this.edit.set(true);
        this.mailboxLabelFormData.set(
          this.mailboxLabelData().find(
            s => s.mailboxLabelId === mailboxLabelId
          ) ?? {}
        );
        this.initForm();
      }),
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
      new TableColumn({
        nameInData: nameof<MailboxLabelDto>((s) => s.mailboxLabelId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.mailboxLabelTableDeleteEmitter,
            edit: this.mailboxLabelTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<MailboxLabelDto>((f) => f.mailboxLabelId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.mailboxLabelFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Name',
                  name: 'name',
                  value: this.mailboxLabelFormData().name,
                },
                outputs: {
                  formValueChangedEmitter: this.mailboxLabelFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public mailboxLabelFormValueChanged(data: MailboxLabelDto): void {
    this.mailboxLabelFormData.set(data);
  }

  public mailboxLabelFormSubmitted(): void {
    if (this.edit()) {
      this.mailboxLabelFacadeService
        .updateMailboxLabel(this.mailboxLabelFormData()?.mailboxLabelId ?? '', this.mailboxLabelFormData())
        .subscribe(() => {
          this.mailboxLabelFormData.set({} as unknown as MailboxLabelDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.mailboxLabelFacadeService
        .createMailboxLabel(this.mailboxLabelFormData())
        .subscribe(
          () => {
            this.mailboxLabelFormData.set({} as unknown as MailboxLabelDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}