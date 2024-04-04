import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { IUserTasks } from '../interfaces/usertasks.interface';
import { environment } from '../environments/environment';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class userTask {
  private apiUrl = environment.apiUrl;
  private tasksSubject: BehaviorSubject<IUserTasks[]> = new BehaviorSubject<IUserTasks[]>([]);

  constructor(private http: HttpClient) { }

  addTask(userId: number, task: IUserTasks): Observable<IUserTasks> {
    const url = `${this.apiUrl}/UserTasks?UserId=${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    });

    return this.http.post<IUserTasks>(url, task, { headers: headers }).pipe(
      tap(() => {
        // Emit the updated task list after adding a new task
        this.updateTaskList(userId);
      })
    );
  }

  update(userId: number, task: IUserTasks): Observable<IUserTasks> {
    const url = `${this.apiUrl}/UserTasks/${userId}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'text/plain'
    });
    return this.http.put<IUserTasks>(url, task, { headers: headers });
  }

  getUserTasks(userId: number): Observable<IUserTasks[]> {
    return this.http.get<IUserTasks[]>(`${this.apiUrl}/UserTasks/${userId}`);
  }

  deleteTask(taskId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/UserTasks/${taskId}`);
  }

  // Helper method to update the task list
  private updateTaskList(userId: number): void {
    this.getUserTasks(userId).subscribe(tasks => {
      this.tasksSubject.next(tasks);
    });
  }

  // Observable to subscribe for getting updated task list
  getTasksObservable(): Observable<IUserTasks[]> {
    return this.tasksSubject.asObservable();
  }
}
