import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';
import { IUserTasks } from '../interfaces/usertasks.interface';

@Injectable({
  providedIn: 'root',
})

//the service for adding a task under the user id, retreiving all tasks for user
//and deleting a specific task with the task id 

export class userTask {
  private apiUrl = environment.apiUrl;
    id: any;

  constructor(private http: HttpClient) { }

  addTask(userId: number, task: IUserTasks): Observable<IUserTasks> {
    const url = `${this.apiUrl}/UserTasks?UserId=${userId}`; 

    const headers = new HttpHeaders({
        'Content-Type': 'application/json', 
        'Accept':'text/plain'
    });
    return this.http.post<IUserTasks>(url, task, {headers: headers});
  }

  getUserTasks(userId: number): Observable<IUserTasks[]> {
    return this.http.get<IUserTasks[]>(`${this.apiUrl}/UserTasks/${userId}`);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/UserTasks/${taskId}`);
  }

}
