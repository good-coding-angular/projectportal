import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {SystemStatusDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkSystemStatusDetailComponent} from '../../../public-link/components/public-link-systemStatus-detail/public-link-systemStatus-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {SystemStatusFacadeService} from '../../../shared/facades/systemStatus-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-systemStatus',
  templateUrl: './public-systemStatus.component.html',
  styleUrls: [
    './public-systemStatus.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicSystemStatusComponent implements OnInit {
  public systemStatusFacadeService = inject(SystemStatusFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public systemStatusTableColumns = signal<TableColumn[]>([]);
  public systemStatusData = signal<SystemStatusDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
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

    ]);
  }
}
