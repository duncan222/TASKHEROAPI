import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  post(user: IUser): Observable<any> {
    const url = `${this.apiUrl}/Users`;
    return this.http.post(url, user);
  }

  get(): Observable<any> {
    const url = `${this.apiUrl}/Users`;
    return this.http.get(url);
  }

  getUserById(userId: number | null): Observable<any> {
    const url = `${this.apiUrl}/Users/${userId}`;
    return this.http.get(url);
  }

  put(user: any): Observable<any> {
    const url = `${this.apiUrl}/Users/${user.userId}`;
    return this.http.put(url, user);
  }
}
