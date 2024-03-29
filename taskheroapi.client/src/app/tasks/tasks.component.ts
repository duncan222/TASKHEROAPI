import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { CrudService } from '../service/crud.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {

  tasks: IUserTasks[] = [];
  taskForm: FormGroup;
  taskSubscription: Subscription | undefined;
  showNotification = false;
  notificationMessage = "";
  color = "";

  constructor(private crudService: CrudService, private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      description: ['', Validators.required],
      title: ['', Validators.required],
      dueDate: [new Date().toISOString(), Validators.required],
      priority: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.crudService.getAllTasks().subscribe((tasks: IUserTasks[]) => {
      this.tasks = tasks;
    });
  }

  onSubmit(): void {
    if (this.taskForm.valid) {
      const { description, title, dueDate, priority } = this.taskForm.value;
      const newTask: IUserTasks = {
        TaskId: 0,
        UserId: 0,
        Description: description,
        TimeStamp: new Date().toISOString(),
        Title: title,
        DueDate: dueDate,
        Importance: priority,
        Weight: 0,
        Urgency: 0
      };

      this.taskSubscription = this.crudService.addTask(newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.taskForm.reset();
          this.notificationMessage = "Task Added!";
          this.color = "#198754";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 5000);
        },
        error: (error) => {
          console.error('Error adding task:', error);
          this.notificationMessage = "Error adding task";
          this.color = "#dc3545";
          this.showNotification = true;
        }
      });
    }
  }

  editTask(task: IUserTasks) {
    this.crudService.editTask(task).subscribe({
      next: (updatedTask) => {
        const index = this.tasks.findIndex(t => t.TaskId === updatedTask.TaskId);
        if (index !== -1) {
          this.tasks[index] = updatedTask;
          this.notificationMessage = "Task Updated!";
          this.color = "#0dcaf0";
          this.showNotification = true;
          setTimeout(() => {
            this.showNotification = false;
          }, 5000);
        }
      },
      error: (error) => {
        console.error('Failed to update task:', error);
        this.notificationMessage = "Failed to update task";
        this.color = "#dc3545";
        this.showNotification = true;
      }
    });
  }

  deleteTask(task: IUserTasks): void {
    this.crudService.deleteTask(task).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(t => t.TaskId !== task.TaskId);
        this.notificationMessage = "Task Deleted!";
        this.color = "#dc3545";
        this.showNotification = true;
        setTimeout(() => {
          this.showNotification = false;
        }, 5000);
      },
      error: (error) => {
        console.error('Failed to delete task:', error);
        this.notificationMessage = "Failed to delete task";
        this.color = "#dc3545";
        this.showNotification = true;
      }
    });
  }

  ngOnDestroy() {
    if (this.taskSubscription) {
      this.taskSubscription.unsubscribe();
    }
  }
}
