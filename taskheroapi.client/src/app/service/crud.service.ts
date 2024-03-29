import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../model/task.model';
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Injectable({
  providedIn: 'root'
})
export class CrudService {
  [x: string]: any;

  serviceURL: string;

  constructor(private http: HttpClient) {
    this.serviceURL = "http://localhost:4200/tasks"
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.serviceURL, task);
  }

  getAllTasks(): Observable<IUserTasks[]> {
    return this.http.get<IUserTasks[]>(this.serviceURL);
  }

  deleteTask(task: Task): Observable<Task> {
    return this.http.delete<Task>(this.serviceURL + '/' + task.id);
  }

  editTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.serviceURL + '/' + task.id, task);
  }

}
