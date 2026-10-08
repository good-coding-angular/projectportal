import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { MailboxDto, MailboxService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailboxFacadeService {
  public mailboxService = inject(MailboxService);

  public createMailbox(data: MailboxDto): Observable<MailboxDto> {
    this.mailboxService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxService.apiMailboxCreateMailboxPost(data);
  }

  public getAllMailbox(): Observable<MailboxDto[]> {
    this.mailboxService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxService.apiMailboxGetAllGet();
  }

  public getMailbox(mailboxId: string): Observable<MailboxDto> {
    this.mailboxService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxService.apiMailboxGetMailboxMailboxIdGet(mailboxId);
  }

  public updateMailbox(mailboxId: string, mailboxDto: MailboxDto): Observable<MailboxDto> {
    this.mailboxService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxService.apiMailboxUpdateMailboxMailboxIdPut(mailboxId, mailboxDto);
  }

  public deleteMailbox(mailboxId: string): Observable<MailboxDto> {
    this.mailboxService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxService.apiMailboxDeleteMailboxMailboxIdDelete(mailboxId);
  }
}