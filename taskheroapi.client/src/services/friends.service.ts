import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FriendsService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getById(userId: number | null): Observable<any> {
    const url = `${this.apiUrl}/UserFriends/${userId}`;
    return this.http.get(url);
  }
}
