import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { ServicesDto, ServicesService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ServicesFacadeService {
  public servicesService = inject(ServicesService);

  public createServices(data: ServicesDto): Observable<ServicesDto> {
    this.servicesService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.servicesService.apiServicesCreateServicesPost(data);
  }

  public getAllServices(): Observable<ServicesDto[]> {
    this.servicesService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.servicesService.apiServicesGetAllGet();
  }

  public getServices(serviceId: string): Observable<ServicesDto> {
    this.servicesService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.servicesService.apiServicesGetServicesServiceIdGet(serviceId);
  }

  public updateServices(serviceId: string, servicesDto: ServicesDto): Observable<ServicesDto> {
    this.servicesService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.servicesService.apiServicesUpdateServicesServiceIdPut(serviceId, servicesDto);
  }

  public deleteServices(serviceId: string): Observable<ServicesDto> {
    this.servicesService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.servicesService.apiServicesDeleteServicesServiceIdDelete(serviceId);
  }
}