import { inject, Injectable } from "@angular/core";
import { HttpHeaders } from '@angular/common/http';
import { UsersDto, UsersService } from '../../backend';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UsersFacadeService {
  public usersService = inject(UsersService);

  public createUsers(data: UsersDto): Observable<UsersDto> {
    this.usersService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.usersService.apiUsersCreateUsersPost(data);
  }

  public getAllUsers(): Observable<UsersDto[]> {
    this.usersService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.usersService.apiUsersGetAllGet();
  }

  public getUsers(userId: string): Observable<UsersDto> {
    this.usersService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.usersService.apiUsersGetUsersUserIdGet(userId);
  }

  public updateUsers(userId: string, usersDto: UsersDto): Observable<UsersDto> {
    this.usersService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.usersService.apiUsersUpdateUsersUserIdPut(userId, usersDto);
  }

  public deleteUsers(userId: string): Observable<UsersDto> {
    this.usersService.defaultHeaders= new HttpHeaders(
      {
        'Content-Type': 'application/json',
      }
    );

    return this.usersService.apiUsersDeleteUsersUserIdDelete(userId);
  }
}