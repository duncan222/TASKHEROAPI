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

  update(userId: number, task: IUserTasks): Observable<any> {
    const url = `${this.apiUrl}/UserTasks/${task.TaskId}`; // Ensure property names match
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });

    // Ensure property names match the server's expectations
    const requestBody = {
      taskId: task.TaskId,
      userId: userId,
      description: task.Description,
      timeStamp: task.TimeStamp,
      title: task.Title,
      dueDate: task.DueDate,
      importance: task.Importance,
      weight: task.Weight,
      urgency: task.Urgency
    };

    console.log("requestbody:", requestBody);

    return this.http.put<IUserTasks>(url, requestBody, { headers: headers });
  }

  getUserTasks(userId: number): Observable<any> {
    return this.http.get<IUserTasks[]>(`${this.apiUrl}/UserTasks/${userId}`);
  }

  deleteTask(taskId: number | undefined): Observable<void> {
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
