import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUsersAccounts } from '../interfaces/useraccounts.interface'
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserAccountService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  get(): Observable<any> {
    const url = `${this.apiUrl}/UsersAccounts`;
    return this.http.get(url);
  }
}
