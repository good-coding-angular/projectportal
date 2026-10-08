import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {MailboxLabelFacadeService} from '../../../shared/facades/mailboxLabel-facade.service';
import {MailboxLabelDto} from '../../../backend';

@Component({
  selector: 'app-public-mailboxLabel-detail',
  templateUrl: './public-mailboxLabel-detail.component.html',
  styleUrls: [
    './public-mailboxLabel-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxLabelDetailComponent implements OnInit {
  public mailboxLabelFacadeService = inject(MailboxLabelFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public mailboxLabel = signal<MailboxLabelDto | undefined>(undefined);

  public mailboxLabelId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.mailboxLabelId = this.activatedRoute.snapshot.params['mailboxLabelId'];
  }

  public loadData(): void {
    if (this.mailboxLabelId) {
      this.mailboxLabelFacadeService
        .getMailboxLabel(this.mailboxLabelId)
        .subscribe(
          mailboxLabel => {
            this.mailboxLabel.set(mailboxLabel);
          },
        );
    }
  }
}
