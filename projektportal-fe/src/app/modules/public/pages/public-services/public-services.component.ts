import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {ServicesDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkServicesDetailComponent} from '../../../public-link/components/public-link-services-detail/public-link-services-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {ServicesFacadeService} from '../../../shared/facades/services-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-services',
  templateUrl: './public-services.component.html',
  styleUrls: [
    './public-services.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicServicesComponent implements OnInit {
  public servicesFacadeService = inject(ServicesFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public servicesTableColumns = signal<TableColumn[]>([]);
  public servicesData = signal<ServicesDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
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

    ]);
  }
}
