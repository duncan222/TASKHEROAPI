import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task';
import { CrudService } from '../service/crud.service';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {

  tasks: IUserTasks[] = [];
  currentUser: number = 0;
  description: string = "";
  timeStamp: string = "";
  title: string = "";
  dueDate: string = "";
  importance: number = 0;
  weight: number = 0;
  urgency: number = 0;

  taskObj: Task = new Task();
  taskArr: Task[] = [];
  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(
    private authService: AuthService,
    private TaskService: userTask,
    private router: Router,
    private crudService: CrudService
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
    this.crudService.getAllTask().subscribe(
      (res: Task[]) => {
        this.taskArr = res;
      },
      (err) => {
        console.error("Unable to get list of tasks", err);
      }
    );
  }

  addTask() {
    console.log('adding...')
    this.taskObj.task_name = this.addTaskValue;
    this.crudService.addTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit(); 
        this.addTaskValue = '';
      },
      (err) => {
        console.error("Failed to add task", err);
      }
    );
  }

  editTask() {
    this.taskObj.task_name = this.editTaskValue;
    this.crudService.editTask(this.taskObj).subscribe(
      (res) => {
        this.ngOnInit(); 
      },
      (err) => {
        console.error("Failed to update task", err);
      }
    );
  }

  deleteTask(etask: Task) {
    this.crudService.deleteTask(etask).subscribe(
      (res) => {
        this.ngOnInit();
      },
      (err) => {
        console.error("Failed to delete task", err);
      }
    );
  }

  getUserTasks() {
    this.TaskService.getUserTasks(this.currentUser).subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
}
