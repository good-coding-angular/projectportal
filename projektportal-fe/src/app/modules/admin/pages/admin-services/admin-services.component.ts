import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {ServicesDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {ServicesFacadeService} from '../../../shared/facades/services-facade.service';
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
  PublicLinkServicesDetailComponent
} from '../../../public-link/components/public-link-services-detail/public-link-services-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-services',
  templateUrl: './admin-services.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-services.component.scss',
  ],
})
export class AdminServicesComponent extends SharedBaseComponent implements OnInit {
  public servicesFacadeService = inject(ServicesFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public servicesTableColumns = signal<TableColumn[]>([]);
  public servicesData = signal<ServicesDto[]>([]);

  public servicesFormSections = signal<FormSectionDeclaration[]>([]);
  public servicesFormData = signal<ServicesDto>({});
  public servicesFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public servicesTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public servicesTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
  }

  public loadData(): void {
    this.servicesFacadeService
      .getAllServices()
      .subscribe(
        services => {
          this.servicesData.set(services);
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
      this.servicesTableDeleteEmitter.subscribe((serviceId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.servicesFacadeService.deleteServices(serviceId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.servicesTableEditEmitter.subscribe((serviceId: any) => {
        this.edit.set(true);
        this.servicesFormData.set(
          this.servicesData().find(
            s => s.serviceId === serviceId
          ) ?? {}
        );
        this.initForm();
      }),
    );
  }

  public initTable(): void {
    this.servicesTableColumns.set([

      new TableColumn({
        nameInData: nameof<ServicesDto>(s => s.serviceId),
        title: 'ServiceId',
        dynamicComponent: new DynamicComponent<PublicLinkServicesDetailComponent>({
          componentType: PublicLinkServicesDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<ServicesDto>(f => f.serviceId)),
          new KeyValuePair('serviceId', nameof<ServicesDto>(f => f.serviceId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<ServicesDto>(s => s.active),
        title: 'Active',
        dynamicComponent: new DynamicComponent<PublicLinkServicesDetailComponent>({
          componentType: PublicLinkServicesDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<ServicesDto>(f => f.active)),
          new KeyValuePair('serviceId', nameof<ServicesDto>(f => f.serviceId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<ServicesDto>(s => s.name),
        title: 'Name',
        dynamicComponent: new DynamicComponent<PublicLinkServicesDetailComponent>({
          componentType: PublicLinkServicesDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<ServicesDto>(f => f.name)),
          new KeyValuePair('serviceId', nameof<ServicesDto>(f => f.serviceId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<ServicesDto>(s => s.url),
        title: 'Url',
        dynamicComponent: new DynamicComponent<PublicLinkServicesDetailComponent>({
          componentType: PublicLinkServicesDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<ServicesDto>(f => f.url)),
          new KeyValuePair('serviceId', nameof<ServicesDto>(f => f.serviceId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<ServicesDto>(s => s.module),
        title: 'Module',
        dynamicComponent: new DynamicComponent<PublicLinkServicesDetailComponent>({
          componentType: PublicLinkServicesDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<ServicesDto>(f => f.module)),
          new KeyValuePair('serviceId', nameof<ServicesDto>(f => f.serviceId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<ServicesDto>((s) => s.serviceId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.servicesTableDeleteEmitter,
            edit: this.servicesTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<ServicesDto>((f) => f.serviceId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.servicesFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Active',
                  name: 'active',
                  value: this.servicesFormData().active,
                },
                outputs: {
                  formValueChangedEmitter: this.servicesFormValueChangeEmitter,
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
                  value: this.servicesFormData().name,
                },
                outputs: {
                  formValueChangedEmitter: this.servicesFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Url',
                  name: 'url',
                  value: this.servicesFormData().url,
                },
                outputs: {
                  formValueChangedEmitter: this.servicesFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Module',
                  name: 'module',
                  value: this.servicesFormData().module,
                },
                outputs: {
                  formValueChangedEmitter: this.servicesFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public servicesFormValueChanged(data: ServicesDto): void {
    this.servicesFormData.set(data);
  }

  public servicesFormSubmitted(): void {
    if (this.edit()) {
      this.servicesFacadeService
        .updateServices(this.servicesFormData()?.serviceId ?? '', this.servicesFormData())
        .subscribe(() => {
          this.servicesFormData.set({} as unknown as ServicesDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.servicesFacadeService
        .createServices(this.servicesFormData())
        .subscribe(
          () => {
            this.servicesFormData.set({} as unknown as ServicesDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}