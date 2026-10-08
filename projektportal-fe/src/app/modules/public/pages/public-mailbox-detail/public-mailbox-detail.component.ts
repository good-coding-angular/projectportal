import {Component, inject, OnInit, signal, ChangeDetectionStrategy} from '@angular/core';
import {PublicPageLayoutComponent} from '../../components/public-page-layout/public-page-layout.component';
import {ActivatedRoute} from "@angular/router";
import {MailboxFacadeService} from '../../../shared/facades/mailbox-facade.service';
import {MailboxDto} from '../../../backend';

@Component({
  selector: 'app-public-mailbox-detail',
  templateUrl: './public-mailbox-detail.component.html',
  styleUrls: [
    './public-mailbox-detail.component.scss',
  ],
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [
    PublicPageLayoutComponent,
  ],
})
export class PublicMailboxDetailComponent implements OnInit {
  public mailboxFacadeService = inject(MailboxFacadeService);
  public activatedRoute = inject(ActivatedRoute);

  public mailbox = signal<MailboxDto | undefined>(undefined);

  public mailboxId: string | undefined;

  public ngOnInit(): void {
    this.initVariablesFromUrlParams();
    this.loadData();
  }

  public initVariablesFromUrlParams(): void {
    this.mailboxId = this.activatedRoute.snapshot.params['mailboxId'];
  }

  public loadData(): void {
    if (this.mailboxId) {
      this.mailboxFacadeService
        .getMailbox(this.mailboxId)
        .subscribe(
          mailbox => {
            this.mailbox.set(mailbox);
          },
        );
    }
  }
}
