import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {UsersDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {PublicLinkUsersDetailComponent} from '../../../public-link/components/public-link-users-detail/public-link-users-detail.component';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {UsersFacadeService} from '../../../shared/facades/users-facade.service';
import {SharedTableComponent} from '../../../shared/components/shared-table/shared-table.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-public-users',
  templateUrl: './public-users.component.html',
  styleUrls: [
    './public-users.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    SharedTableComponent,
    PublicPageLayoutComponent,
  ],
})
export class PublicUsersComponent implements OnInit {
  public usersFacadeService = inject(UsersFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public usersTableColumns = signal<TableColumn[]>([]);
  public usersData = signal<UsersDto[]>([]);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
  }

  public loadData(): void {
    this.usersFacadeService
      .getAllUsers()
      .subscribe(
        users => {
          this.usersData.set(users);
        },
        (error) => {
          this.infoWindowService.showError(
            'There seems to be an error with the backend and a login is currently not possible. ' + error
          )
        }
      );
  }

  public initTable(): void {
    this.usersTableColumns.set([
      new TableColumn({
        nameInData: nameof<UsersDto>(s => s.userId),
        title: 'UserId',
        dynamicComponent: new DynamicComponent<PublicLinkUsersDetailComponent>({
          componentType: PublicLinkUsersDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<UsersDto>(f => f.userId)),
          new KeyValuePair('userId', nameof<UsersDto>(f => f.userId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<UsersDto>(s => s.name),
        title: 'Name',
        dynamicComponent: new DynamicComponent<PublicLinkUsersDetailComponent>({
          componentType: PublicLinkUsersDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<UsersDto>(f => f.name)),
          new KeyValuePair('userId', nameof<UsersDto>(f => f.userId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<UsersDto>(s => s.password),
        title: 'Password',
        dynamicComponent: new DynamicComponent<PublicLinkUsersDetailComponent>({
          componentType: PublicLinkUsersDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<UsersDto>(f => f.password)),
          new KeyValuePair('userId', nameof<UsersDto>(f => f.userId))
        ],
      }),
      new TableColumn({
        nameInData: nameof<UsersDto>(s => s.active),
        title: 'Active',
        dynamicComponent: new DynamicComponent<PublicLinkUsersDetailComponent>({
          componentType: PublicLinkUsersDetailComponent,
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair('linkText', nameof<UsersDto>(f => f.active)),
          new KeyValuePair('userId', nameof<UsersDto>(f => f.userId))
        ],
      }),

    ]);
  }
}
