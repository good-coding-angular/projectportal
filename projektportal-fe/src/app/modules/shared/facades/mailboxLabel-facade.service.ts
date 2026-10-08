import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { MailboxLabelDto, MailboxLabelService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MailboxLabelFacadeService {
  public mailboxLabelService = inject(MailboxLabelService);

  public createMailboxLabel(data: MailboxLabelDto): Observable<MailboxLabelDto> {
    this.mailboxLabelService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxLabelService.apiMailboxLabelCreateMailboxLabelPost(data);
  }

  public getAllMailboxLabel(): Observable<MailboxLabelDto[]> {
    this.mailboxLabelService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxLabelService.apiMailboxLabelGetAllGet();
  }

  public getMailboxLabel(mailboxLabelId: string): Observable<MailboxLabelDto> {
    this.mailboxLabelService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxLabelService.apiMailboxLabelGetMailboxLabelMailboxLabelIdGet(mailboxLabelId);
  }

  public updateMailboxLabel(mailboxLabelId: string, mailboxLabelDto: MailboxLabelDto): Observable<MailboxLabelDto> {
    this.mailboxLabelService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxLabelService.apiMailboxLabelUpdateMailboxLabelMailboxLabelIdPut(mailboxLabelId, mailboxLabelDto);
  }

  public deleteMailboxLabel(mailboxLabelId: string): Observable<MailboxLabelDto> {
    this.mailboxLabelService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.mailboxLabelService.apiMailboxLabelDeleteMailboxLabelMailboxLabelIdDelete(mailboxLabelId);
  }
}