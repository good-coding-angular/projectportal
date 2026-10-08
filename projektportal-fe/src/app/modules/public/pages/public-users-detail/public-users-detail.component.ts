import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {UsersFacadeService} from '../../../shared/facades/users-facade.service';
import {UsersDto} from '../../../backend';

@Component({
  selector: 'app-public-users-detail',
  templateUrl: './public-users-detail.component.html',
  styleUrls: [
    './public-users-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicUsersDetailComponent implements OnInit {
  public usersFacadeService = inject(UsersFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public users = signal<UsersDto | undefined>(undefined);

  public userId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  public loadData(): void {
    if (this.userId) {
      this.usersFacadeService
        .getUsers(this.userId)
        .subscribe(
          users => {
            this.users.set(users);
          },
        );
    }
  }
}
