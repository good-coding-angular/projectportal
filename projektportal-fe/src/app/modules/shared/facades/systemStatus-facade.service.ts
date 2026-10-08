import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { SystemStatusDto, SystemStatusService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SystemStatusFacadeService {
  public systemStatusService = inject(SystemStatusService);

  public createSystemStatus(data: SystemStatusDto): Observable<SystemStatusDto> {
    this.systemStatusService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.systemStatusService.apiSystemStatusCreateSystemStatusPost(data);
  }

  public getAllSystemStatus(): Observable<SystemStatusDto[]> {
    this.systemStatusService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.systemStatusService.apiSystemStatusGetAllGet();
  }

  public getSystemStatus(systemStatusId: string): Observable<SystemStatusDto> {
    this.systemStatusService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.systemStatusService.apiSystemStatusGetSystemStatusSystemStatusIdGet(systemStatusId);
  }

  public updateSystemStatus(systemStatusId: string, systemStatusDto: SystemStatusDto): Observable<SystemStatusDto> {
    this.systemStatusService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.systemStatusService.apiSystemStatusUpdateSystemStatusSystemStatusIdPut(systemStatusId, systemStatusDto);
  }

  public deleteSystemStatus(systemStatusId: string): Observable<SystemStatusDto> {
    this.systemStatusService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.systemStatusService.apiSystemStatusDeleteSystemStatusSystemStatusIdDelete(systemStatusId);
  }
}