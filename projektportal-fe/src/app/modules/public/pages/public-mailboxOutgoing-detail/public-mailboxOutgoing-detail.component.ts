import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {MailboxOutgoingFacadeService} from '../../../shared/facades/mailboxOutgoing-facade.service';
import {MailboxOutgoingDto} from '../../../backend';

@Component({
  selector: 'app-public-mailboxOutgoing-detail',
  templateUrl: './public-mailboxOutgoing-detail.component.html',
  styleUrls: [
    './public-mailboxOutgoing-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxOutgoingDetailComponent implements OnInit {
  public mailboxOutgoingFacadeService = inject(MailboxOutgoingFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public mailboxOutgoing = signal<MailboxOutgoingDto | undefined>(undefined);

  public mailboxOutgoingId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.mailboxOutgoingId = this.activatedRoute.snapshot.params['mailboxOutgoingId'];
  }

  public loadData(): void {
    if (this.mailboxOutgoingId) {
      this.mailboxOutgoingFacadeService
        .getMailboxOutgoing(this.mailboxOutgoingId)
        .subscribe(
          mailboxOutgoing => {
            this.mailboxOutgoing.set(mailboxOutgoing);
          },
        );
    }
  }
}
