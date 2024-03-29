import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../model/task.model';
import { Subscription } from 'rxjs';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: IUserTasks[] = [];
  taskArr: Task[] = [];
  editTaskObj: Task = {
      id: 0,
      task_name: '',
      description: '',
      timeStamp: '',
      title: '',
      dueDate: '',
      importance: 0,
      weight: 0,
      urgency: 0
  };
  addTaskValue: string = '';
  editTaskValue: string = '';
  taskObj: IUserTasks = { 
    TaskId: 0,
    UserId: 0,
    Description: '',
    TimeStamp: '',
    Title: '',
    DueDate: '',
    Importance: 0,
    Weight: 0,
    Urgency: 0
  };
  taskSubscription: Subscription | undefined;

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.crudService['getAllTasks']().subscribe((tasks: IUserTasks[]) => {
      this.tasks = tasks;
    });
  }

  addTask() {
    const tempTask: IUserTasks = {
      TaskId: 0,
      UserId: 0,
      Description: this.addTaskValue,
      TimeStamp: new Date().toISOString(),
      Title: '',
      DueDate: new Date().toISOString(),
      Importance: 0,
      Weight: 0,
      Urgency: 0
    };
  }

  editTask(task: Task) {
    this.taskSubscription = this.crudService.editTask(task).subscribe({
      next: (updatedTask) => {
      },
      error: (error) => {
        console.error('Failed to update task:', error);
      }
    });
  }

  deleteTask(task: IUserTasks | any): void {
    if (task && task.TaskId !== undefined) { 
      this.taskSubscription = this.crudService.deleteTask(task).subscribe({
        next: () => {
          this.tasks = this.tasks.filter(t => t.TaskId !== task.TaskId);
        },
        error: (error) => {
          console.error('Failed to delete task:', error);
        }
      });
    }
  }

  call(task: Task) {
    // Implement your logic here for the 'call' method
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
