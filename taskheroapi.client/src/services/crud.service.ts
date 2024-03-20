import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUserTasks } from '../interfaces/usertasks.interface'; // Update the import statement

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiUrl = '/api/tasks'; // Update this to match your backend endpoint

  constructor(private http: HttpClient) { }

  getAllTasks(): Observable<IUserTasks[]> { // Update the return type
    return this.http.get<IUserTasks[]>(this.apiUrl);
  }

  addTask(task: IUserTasks): Observable<IUserTasks> { // Update the parameter and return type
    return this.http.post<IUserTasks>(this.apiUrl, task);
  }

  editTask(task: IUserTasks): Observable<IUserTasks> { // Update the parameter and return type
    const url = `${this.apiUrl}/${task.taskId}`; // Assuming task has an id
    return this.http.put<IUserTasks>(url, task);
  }

  deleteTask(taskId: number): Observable<void> { // Update the parameter type
    const url = `${this.apiUrl}/${taskId}`;
    return this.http.delete<void>(url);
  }
}
