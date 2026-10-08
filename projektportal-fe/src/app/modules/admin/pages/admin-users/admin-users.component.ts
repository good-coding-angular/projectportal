import {Component, EventEmitter, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {TableColumn} from "../../../shared/models/table-column.class";
import {UsersDto} from '../../../backend';
import {nameof} from 'ts-simple-nameof';
import {DynamicComponent} from '../../../shared/models/dynamic-component.class';
import {KeyValuePair} from "../../../shared/models/key-value-pair.class";
import {AdminPageLayoutComponent} from '../../components/admin-page-layout/admin-page-layout.component';
import {UsersFacadeService} from '../../../shared/facades/users-facade.service';
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
  PublicLinkUsersDetailComponent
} from '../../../public-link/components/public-link-users-detail/public-link-users-detail.component';
import {InfoWindowService} from '../../../shared/services/info-window.service';

@Component({
  selector: 'app-admin-pages-users',
  templateUrl: './admin-users.component.html',
  imports: [
    SharedTableComponent,
    AdminPageLayoutComponent,
    SharedFormComponent,
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrls: [
    './admin-users.component.scss',
  ],
})
export class AdminUsersComponent extends SharedBaseComponent implements OnInit {
  public usersFacadeService = inject(UsersFacadeService);
  public infoWindowService = inject(InfoWindowService);

  public usersTableColumns = signal<TableColumn[]>([]);
  public usersData = signal<UsersDto[]>([]);

  public usersFormSections = signal<FormSectionDeclaration[]>([]);
  public usersFormData = signal<UsersDto>({});
  public usersFormValueChangeEmitter = new EventEmitter<KeyValuePair>();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public usersTableDeleteEmitter = new EventEmitter<any>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public usersTableEditEmitter = new EventEmitter<any>();

  public edit = signal<boolean>(false);

  public ngOnInit(): void {
    this.loadData();
    this.initTable();
    this.initForm();
    this.initTableActions();
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

  public initTableActions(): void {
    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.usersTableDeleteEmitter.subscribe((userId: any) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
          this.usersFacadeService.deleteUsers(userId)
            .subscribe(() => {
              this.loadData();
            });
        }
      }),
    );

    this.subscriptions.add(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      this.usersTableEditEmitter.subscribe((userId: any) => {
        this.edit.set(true);
        this.usersFormData.set(
          this.usersData().find(
            s => s.userId === userId
          ) ?? {}
        );
        this.initForm();
      }),
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
      new TableColumn({
        nameInData: nameof<UsersDto>((s) => s.userId),
        title: 'Edit / Delete',
        dynamicComponent: new DynamicComponent<SharedTableActionsComponent>({
          componentType: SharedTableActionsComponent,
          inputs: {
            delete: this.usersTableDeleteEmitter,
            edit: this.usersTableEditEmitter,
          },
        }),
        dynamicComponentRowSignalInputValues: [
          new KeyValuePair(
            'id',
            nameof<UsersDto>((f) => f.userId),
          ),
        ],
      }),

    ]);
  }

  public initForm(): void {
    this.usersFormSections.set([
      new FormSectionDeclaration({
        formFields: [
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Name',
                  name: 'name',
                  value: this.usersFormData().name,
                },
                outputs: {
                  formValueChangedEmitter: this.usersFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Password',
                  name: 'password',
                  value: this.usersFormData().password,
                },
                outputs: {
                  formValueChangedEmitter: this.usersFormValueChangeEmitter,
                }
              }),
            }),
            new FormFieldDeclaration({
              bootstrapWidth: 12,
              formComponent: new DynamicComponent<SharedFormInputComponent>({
                componentType: SharedFormInputComponent,
                signalInputs: {
                  label: 'Active',
                  name: 'active',
                  value: this.usersFormData().active,
                },
                outputs: {
                  formValueChangedEmitter: this.usersFormValueChangeEmitter,
                }
              }),
            }),
        ],
      })
    ]);
  }

  public usersFormValueChanged(data: UsersDto): void {
    this.usersFormData.set(data);
  }

  public usersFormSubmitted(): void {
    if (this.edit()) {
      this.usersFacadeService
        .updateUsers(this.usersFormData()?.userId ?? '', this.usersFormData())
        .subscribe(() => {
          this.usersFormData.set({} as unknown as UsersDto);
          this.edit.set(false);
          this.loadData();
          this.initForm();
        });
    } else {
      this.usersFacadeService
        .createUsers(this.usersFormData())
        .subscribe(
          () => {
            this.usersFormData.set({} as unknown as UsersDto);
            this.loadData();
            this.initForm();
          }
        );
    }
  }
}