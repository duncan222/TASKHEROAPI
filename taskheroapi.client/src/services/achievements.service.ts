import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';
import { IUserTasks } from '../interfaces/usertasks.interface';

@Injectable({
  providedIn: 'root',
})

//this is a service for getting the achievements, needs to run parrallel with the other service 

export class Achievements {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

}