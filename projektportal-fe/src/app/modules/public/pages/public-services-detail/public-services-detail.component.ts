import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {ServicesFacadeService} from '../../../shared/facades/services-facade.service';
import {ServicesDto} from '../../../backend';

@Component({
  selector: 'app-public-services-detail',
  templateUrl: './public-services-detail.component.html',
  styleUrls: [
    './public-services-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicServicesDetailComponent implements OnInit {
  public servicesFacadeService = inject(ServicesFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public services = signal<ServicesDto | undefined>(undefined);

  public serviceId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.serviceId = this.activatedRoute.snapshot.params['serviceId'];
  }

  public loadData(): void {
    if (this.serviceId) {
      this.servicesFacadeService
        .getServices(this.serviceId)
        .subscribe(
          services => {
            this.services.set(services);
          },
        );
    }
  }
}
