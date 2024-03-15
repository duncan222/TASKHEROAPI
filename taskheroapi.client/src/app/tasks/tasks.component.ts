import { Component, OnInit } from '@angular/core';
import { Task } from '../model/task'; 
import { CrudService } from '../service/crud.service'; 
import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent {

  constructor(private authService: AuthService,private TaskService: userTask, private router: Router) { }

  //array for all the users tasks 
  tasks: IUserTasks[] = [];

  //the different variables to make up the task interface. 
  currentUser: number = 0;
  description: string = "";
  timeStamp: string = "";
  title: string = "";
  dueDate: string = "";
  importance: number = 0;
  weight: number = 0;
  urgency: number = 0;

  addTask() { 
    const tempTask: IUserTasks = { 
      taskId: 0, 
      userId: 0, 
      descripcion: this.description, 
      timeStamp: this.timeStamp, 
      title: this.title, 
      dueDate: this.dueDate, 
      importance: this.importance, 
      weight: this.weight, 
      urgency: this.urgency
    }

    this.TaskService.addTask(this.currentUser, tempTask)
      .subscribe((addedTask: IUserTasks) => { 
        console.log('Task added: ', addedTask); 
        this.getUserTasks(); 
      })
  }
export class TasksComponent implements OnInit {

  taskObj: Task = new Task();
  taskArr: Task[] = [];

  addTaskValue: string = '';
  editTaskValue: string = '';

  constructor(private crudService: CrudService) { }

  ngOnInit(): void {
    this.editTaskValue = '';
    this.addTaskValue = '';
    this.taskObj = new Task();
    this.taskArr = [];
    this.getAllTask();
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

  getUserTasks(){ 
    this.TaskService.getUserTasks(this.currentUser)
      .subscribe(tasks => { 
        this.tasks = tasks; 
      })
  }

  ngOnInit() { 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
  call(etask: Task) {
    this.taskObj = etask;
    this.editTaskValue = etask.task_name;
  }
  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      //Get logged-in user
      const loggedInUserId = this.authService.getLoggedInUserId();
      //From here call whatever endpoints you need to call to get necessary data
    }
    else {
      this.router.navigate(['/login']);
    }

  }
}
