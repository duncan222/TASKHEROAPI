import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
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

  addFollower(idToFollow: number | null, currentUserId: number | null): Observable<any> {
    const url = `${this.apiUrl}/UserFollows`;
    let params = new HttpParams();
    if (idToFollow !== null) {
      params = params.set('idToFollow', idToFollow.toString());
    }
    if (currentUserId !== null) {
      params = params.set('currentUserId', currentUserId.toString());
    }
    return this.http.post(url, {}, { params: params });
  }
}
