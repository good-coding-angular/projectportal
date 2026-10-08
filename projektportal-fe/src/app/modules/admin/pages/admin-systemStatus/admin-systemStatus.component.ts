import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {SystemStatusDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {SystemStatusFacadeService} from '../../../shared/facades/systemStatus-facade.service';
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
  PublicLinkSystemStatusDetailComponent
} from '../../../public-link/components/public-link-systemStatus-detail/public-link-systemStatus-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-systemStatus',
  templateUrl: './admin-systemStatus.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-systemStatus.component.scss',
  ],
})
export class AdminSystemStatusComponent extends SharedBaseComponent implements OnInit {
  public systemStatusFacadeService = inject(SystemStatusFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public systemStatusTableColumns = signal<TableColumn[]>([]);
  public systemStatusData = signal<SystemStatusDto[]>([]);

  public systemStatusFormSections = signal<FormSectionDeclaration[]>([]);
  public systemStatusFormData = signal<SystemStatusDto>({});
  public systemStatusFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public systemStatusTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public systemStatusTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
  }

  public loadData(): void {
    this.systemStatusFacadeService
      .getAllSystemStatus()
      .subscribe(
        systemStatus => {
          this.systemStatusData.set(systemStatus);
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
      this.systemStatusTableDeleteEmitter.subscribe((systemStatusId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.systemStatusFacadeService.deleteSystemStatus(systemStatusId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.systemStatusTableEditEmitter.subscribe((systemStatusId: any) => {
        this.edit.set(true);
        this.systemStatusFormData.set(
          this.systemStatusData().find(
            s => s.systemStatusId === systemStatusId
          ) ?? {}
        );
        this.initForm();
      }),
    );
  }

  public initTable(): void {
    this.systemStatusTableColumns.set([

      new TableColumn({
        nameInData: nameof<SystemStatusDto>(s => s.blocking),
        title: 'Blocking',
        dynamicComponent: new DynamicComponent<PublicLinkSystemStatusDetailComponent>({
          componentType: PublicLinkSystemStatusDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<SystemStatusDto>(f => f.blocking)),
          new KeyValuePair('systemStatusId', nameof<SystemStatusDto>(f => f.systemStatusId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<SystemStatusDto>(s => s.toDate),
        title: 'ToDate',
        dynamicComponent: new DynamicComponent<PublicLinkSystemStatusDetailComponent>({
          componentType: PublicLinkSystemStatusDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<SystemStatusDto>(f => f.toDate)),
          new KeyValuePair('systemStatusId', nameof<SystemStatusDto>(f => f.systemStatusId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<SystemStatusDto>(s => s.systemStatusId),
        title: 'SystemStatusId',
        dynamicComponent: new DynamicComponent<PublicLinkSystemStatusDetailComponent>({
          componentType: PublicLinkSystemStatusDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<SystemStatusDto>(f => f.systemStatusId)),
          new KeyValuePair('systemStatusId', nameof<SystemStatusDto>(f => f.systemStatusId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<SystemStatusDto>(s => s.fromDate),
        title: 'FromDate',
        dynamicComponent: new DynamicComponent<PublicLinkSystemStatusDetailComponent>({
          componentType: PublicLinkSystemStatusDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<SystemStatusDto>(f => f.fromDate)),
          new KeyValuePair('systemStatusId', nameof<SystemStatusDto>(f => f.systemStatusId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<SystemStatusDto>(s => s.name),
        title: 'Name',
        dynamicComponent: new DynamicComponent<PublicLinkSystemStatusDetailComponent>({
          componentType: PublicLinkSystemStatusDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<SystemStatusDto>(f => f.name)),
          new KeyValuePair('systemStatusId', nameof<SystemStatusDto>(f => f.systemStatusId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<SystemStatusDto>((s) => s.systemStatusId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.systemStatusTableDeleteEmitter,
            edit: this.systemStatusTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<SystemStatusDto>((f) => f.systemStatusId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.systemStatusFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Blocking',
                  name: 'blocking',
                  value: this.systemStatusFormData().blocking,
                },
                outputs: {
                  formValueChangedEmitter: this.systemStatusFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'ToDate',
                  name: 'toDate',
                  value: this.systemStatusFormData().toDate,
                },
                outputs: {
                  formValueChangedEmitter: this.systemStatusFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'FromDate',
                  name: 'fromDate',
                  value: this.systemStatusFormData().fromDate,
                },
                outputs: {
                  formValueChangedEmitter: this.systemStatusFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Name',
                  name: 'name',
                  value: this.systemStatusFormData().name,
                },
                outputs: {
                  formValueChangedEmitter: this.systemStatusFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public systemStatusFormValueChanged(data: SystemStatusDto): void {
    this.systemStatusFormData.set(data);
  }

  public systemStatusFormSubmitted(): void {
    if (this.edit()) {
      this.systemStatusFacadeService
        .updateSystemStatus(this.systemStatusFormData()?.systemStatusId ?? '', this.systemStatusFormData())
        .subscribe(() => {
          this.systemStatusFormData.set({} as unknown as SystemStatusDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.systemStatusFacadeService
        .createSystemStatus(this.systemStatusFormData())
        .subscribe(
          () => {
            this.systemStatusFormData.set({} as unknown as SystemStatusDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}