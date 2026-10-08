import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { MailboxOutgoingDto, MailboxOutgoingService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailboxOutgoingFacadeService {
  public mailboxOutgoingService = inject(MailboxOutgoingService);

  public createMailboxOutgoing(data: MailboxOutgoingDto): Observable<MailboxOutgoingDto> {
    this.mailboxOutgoingService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxOutgoingService.apiMailboxOutgoingCreateMailboxOutgoingPost(data);
  }

  public getAllMailboxOutgoing(): Observable<MailboxOutgoingDto[]> {
    this.mailboxOutgoingService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxOutgoingService.apiMailboxOutgoingGetAllGet();
  }

  public getMailboxOutgoing(mailboxOutgoingId: string): Observable<MailboxOutgoingDto> {
    this.mailboxOutgoingService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxOutgoingService.apiMailboxOutgoingGetMailboxOutgoingMailboxOutgoingIdGet(mailboxOutgoingId);
  }

  public updateMailboxOutgoing(mailboxOutgoingId: string, mailboxOutgoingDto: MailboxOutgoingDto): Observable<MailboxOutgoingDto> {
    this.mailboxOutgoingService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxOutgoingService.apiMailboxOutgoingUpdateMailboxOutgoingMailboxOutgoingIdPut(mailboxOutgoingId, mailboxOutgoingDto);
  }

  public deleteMailboxOutgoing(mailboxOutgoingId: string): Observable<MailboxOutgoingDto> {
    this.mailboxOutgoingService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxOutgoingService.apiMailboxOutgoingDeleteMailboxOutgoingMailboxOutgoingIdDelete(mailboxOutgoingId);
  }
}