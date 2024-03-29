import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = '/api/tasks';

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<IUserTasks[]> {
    return this.http.get<IUserTasks[]>(this.apiUrl);
  }

  addTask(task: IUserTasks): Observable<IUserTasks> {
    return this.http.post<IUserTasks>(this.apiUrl, task);
  }

  editTask(task: IUserTasks): Observable<IUserTasks> {
    const url = `${this.apiUrl}/${task.TaskId}`; // Changed task.taskId to task.TaskId
    return this.http.put<IUserTasks>(url, task);
  }

  deleteTask(taskId: number): Observable<void> {
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
}
