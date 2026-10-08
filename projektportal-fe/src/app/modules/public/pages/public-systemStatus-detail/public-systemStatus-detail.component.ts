import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {SystemStatusFacadeService} from '../../../shared/facades/systemStatus-facade.service';
import {SystemStatusDto} from '../../../backend';

@Component({
  selector: 'app-public-systemStatus-detail',
  templateUrl: './public-systemStatus-detail.component.html',
  styleUrls: [
    './public-systemStatus-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicSystemStatusDetailComponent implements OnInit {
  public systemStatusFacadeService = inject(SystemStatusFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public systemStatus = signal<SystemStatusDto | undefined>(undefined);

  public systemStatusId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.systemStatusId = this.activatedRoute.snapshot.params['systemStatusId'];
  }

  public loadData(): void {
    if (this.systemStatusId) {
      this.systemStatusFacadeService
        .getSystemStatus(this.systemStatusId)
        .subscribe(
          systemStatus => {
            this.systemStatus.set(systemStatus);
          },
        );
    }
  }
}
