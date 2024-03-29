import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';
import { IUserAchievements } from '../interfaces/userachievements.interface';
@Injectable({
  providedIn: 'root',
})

//this is a service for getting the users achievements, updating, and deleting. needs to be worked on 

export class userAchievements {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  checkTableExistence(userId: number): Observable<boolean> {
    const url = `${this.apiUrl}/UserAchievements?UserId=${userId}`;
    return this.http.get<boolean>(url);
  }

  add (userId: number, achievement: IUserAchievements): Observable<IUserAchievements> {
    const url = `${this.apiUrl}/UserAchievements?UserId=${userId}`; 

    const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept':'text/plain'
    });
    return this.http.post<IUserAchievements>(url, achievement, {headers: headers});
  }

  update (userId: number, achievement: IUserAchievements): Observable<IUserAchievements> {
    const url = `${this.apiUrl}/UserAchievements/${userId}`; 

    const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept':'text/plain'
    });
    return this.http.put<IUserAchievements>(url, achievement, {headers: headers});
  }


  getAchievements(userId: number): Observable<IUserAchievements[]> {
    return this.http.get<IUserAchievements[]>(`${this.apiUrl}/UserAchievements/${userId}`);
  }


}