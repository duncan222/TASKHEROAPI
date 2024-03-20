import { Component, OnInit, OnDestroy } from '@angular/core';
import { Task } from '../model/task.model';
import { CrudService } from '../service/crud.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: IUserTasks[] = [];
  currentUser: number = 0;
  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';
  taskSubscription: Subscription | undefined;

  constructor(
    private crudService: CrudService,
    private authService: AuthService,
    private router: Router,
    private TaskService: userTask
  ) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const loggedInUserId = Number(this.authService.getLoggedInUserId());
      this.currentUser = loggedInUserId;
      this.getAllTask();
      this.getUserTasks();
    } else {
      this.router.navigate(['/login']);
    }
  }

  getAllTask() {
    this.taskSubscription = this.crudService.getAllTask().subscribe({
      next: (res: Task[]) => {
        this.taskArr = res;
      },
      error: (err) => {
        console.error("Unable to get list of tasks", err);
      }
    });
  }

  addTask() {
    console.log('adding...')
    this.taskObj.task_name = this.addTaskValue;
    this.taskObj.description = ''; // Add description here
    this.taskObj.timeStamp = ''; // Add timeStamp here
    this.taskObj.title = ''; // Add title here
    this.taskObj.dueDate = ''; // Add dueDate here
    this.taskObj.importance = 0; // Add importance here
    this.taskObj.weight = 0; // Add weight here
    this.taskObj.urgency = 0; // Add urgency here

    this.crudService.addTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
        this.addTaskValue = '';
      },
      error: (err) => {
        console.error("Failed to add task", err);
      }
    });
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error("Failed to update task", err);
      }
    });
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe({
      next: (res) => {
        this.ngOnInit();
      },
      error: (err) => {
        console.error("Failed to delete task", err);
      }
    });
  }

  getUserTasks() {
    this.TaskService.getUserTasks(this.currentUser).subscribe({
      next: (tasks: IUserTasks[]) => {
        this.tasks = tasks;
      },
      error: (err) => {
        console.error("Failed to get user tasks", err);
      }
    });
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
