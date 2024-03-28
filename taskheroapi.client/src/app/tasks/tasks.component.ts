import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../model/task.model';
import { CrudService } from '../service/crud.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { Subscription } from 'rxjs';
import { IUserTasks } from '../interfaces/usertasks.interface';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: IUserTasks[] = [];
  currentUser: number = 0;
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';
  taskSubscription: Subscription | undefined;

  addTask() { 
    const tempTask: IUserTasks = { 
      TaskId: 0, 
      UserId: 0, 
      Description: this.description, 
      TimeStamp: this.timeStamp, 
      Title: this.title, 
      DueDate: this.dueDate, 
      Importance: this.importance, 
      Weight: this.weight, 
      Urgency: this.urgency
    }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (error) => {
        console.error('Failed to add task:', error);
      }
    });
  }

  editTask(task: IUserTasks) {
    this.subscription = this.crudService.editTask(task).subscribe({
      next: (updatedTask) => {
        // Handle edit success if needed
      },
      error: (error) => {
        console.error('Failed to update task:', error);
      }
    });
  }

  deleteTask(taskId: number): void {
    this.subscription = this.crudService.deleteTask(taskId).subscribe({
      next: () => {
        this.taskArr = this.taskArr.filter(t => t.id !== taskId);
      },
      error: (error) => {
        console.error('Failed to delete task:', error);
      }
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
