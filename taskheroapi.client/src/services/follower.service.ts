import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class FollowerService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getFollowingById(userId: number | null): Observable<any> {
    const url = `${this.apiUrl}/Users/${userId}/following`;
    return this.http.get(url);
  }

  getFollowersById(userId: number | null): Observable<any> {
    const url = `${this.apiUrl}/Users/${userId}/followers`;
    return this.http.get(url);
  }
}
