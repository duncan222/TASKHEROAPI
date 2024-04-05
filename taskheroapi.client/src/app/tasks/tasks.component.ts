import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { userTask } from '../../services/userTasks.service';
import { AuthService } from '../../services/auth.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
import { Achievements } from '../../services/achievements.service';
import { MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { DOCUMENT } from "@angular/common";

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  selectedFilter: string = 'newest'; // Default filter
  currentUser: number = 0;
  taskGroup: FormGroup;
  tasks: IUserTasks[] = []; // Array to store tasks
  user_achievements: any;
  showNotification = false;
  notificationMessage = "";
  color = "";
  weeklytasks = 0;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private taskService: userTask,
    private authService: AuthService,
    private Achievements: userAchievements,
    private achievements: Achievements,
    private dialog: MatDialog
  ) {
    this.taskGroup = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      date: new FormControl(new Date()),
      priority: new FormControl('')
    });
  }

  startDate = new Date();
  minDate = new Date();

  ngOnInit(): void {
    if (this.authService.getLoggedInUserId != null) {
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    this.getAchievements();
    this.loadTasks();
    // Subscribe to the observable that emits the updated task list
  }

  loadTasks(): void {
    // Load tasks for the current user
    this.taskService.getUserTasks(this.currentUser).subscribe(
      (userTasks) => {
        for (const userTask of userTasks) {
          this.tasks.push({ Title: userTask.title, Description: userTask.description, DueDate: userTask.dueDate, Importance: userTask.importance, TimeStamp: userTask.timeStamp, Weight: userTask.weight, Urgency: userTask.urgency, TaskId: userTask.taskId })
        }
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  refreshPage() {
    this.document.location.reload();
  }

  onSubmit(): void {
    if (this.taskGroup.valid && this.taskGroup != null) {
      const descriptionControl = this.taskGroup.get('description');
      const dueControl = this.taskGroup.get('date');
      const titleControl = this.taskGroup.get('title');
      const priorityControl = this.taskGroup.get('priority');
      let newPriorty: any;

      if (priorityControl?.value == "low") {
        newPriorty = "1";
      }
      else if (priorityControl?.value == "medium") {
        newPriorty = "2";
      }
      else {
        newPriorty = "3";
      }

      if (descriptionControl && dueControl && titleControl && priorityControl) {
        const urgency = this.Urgency(new Date(), dueControl.value);
        const weight = this.Weight(urgency, newPriorty);
        const taskInstance: IUserTasks = {
          TaskId: 0,
          UserId: this.currentUser,
          Description: descriptionControl.value,
          TimeStamp: new Date().toString(),
          Title: titleControl.value,
          DueDate: dueControl.value.toString(),
          Importance: newPriorty,
          Weight: weight,
          Urgency: urgency,
        };

        // Add the submitted task to the tasks array
        this.tasks.push(taskInstance);
        // Clear the form after submission
        this.taskGroup.reset();

        console.log(taskInstance);

        this.taskService.addTask(this.currentUser, taskInstance).subscribe(
          response => {
            console.log("added")
            this.notificationMessage = "Task Added!"
            this.color = "#198754";
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 5000);
          },
          error => {
            console.error('Error saving todo:', error);
          }
        )
      }
    }
  }

  editTask(task: IUserTasks): void {
    const dialogRef = this.dialog.open(EditTaskComponent, {
      width: '500px', // Adjust the width as needed
      data: { task: task }
    });
    console.log("task", task);

    dialogRef.afterClosed().subscribe(updatedTask => {
      if (updatedTask) {
        updatedTask.DueDate = String(updatedTask.DueDate)
        if (updatedTask.Importance == "low") {
          updatedTask.Importance = 1;
        }
        else if (updatedTask.importance == "medium") {
          updatedTask.Importance = 2;
        }
        else {
          updatedTask.Importance = 3;
        }
        console.log("updatedTask:", updatedTask);
        this.taskService.update(this.currentUser, updatedTask).subscribe(
          (response) => {
            console.log("Task updated successfully", response);
            this.refreshPage();
          },
          (error) => {
            console.log("Error editing task: ", error);
          }
        );
      }
    });
  }

  deleteTask(task: IUserTasks): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Are you sure you want to delete this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Delete task logic here
        this.taskService.deleteTask(task.TaskId).subscribe(
          (response) => {
            console.log("Task deleted", response);
            this.refreshPage();
          },
          (error) => {
            console.log("Error deleting task:", error);
          }
        );
      }
    });
  }


  completeTask(task: IUserTasks): void {
    // Implement complete task functionality here
  }

  updateAchievements(currentUser: number, acheivement: IUserAchievements): void {
    this.Achievements.update(currentUser, acheivement)
      .subscribe({
        next: () => {
          // Successfully updates values of the user's achievements
          this.getAchievements();
        },
        error: error => {
          console.log('error updating', error);
        }
      });
  }

  calculateSunday(due: string): boolean {
    // Getting the date value of 'next Sunday'
    const today = new Date();
    const daysOfWeek = today.getDay();
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);
    // Returning the length of the filtered tasks... all that for that. Has to be an easier way 
    return new Date(due) < nextSunday;
  }

  hasSundaySinceDate(startDate: Date): boolean {
    const currentDate = new Date();
    let currentDateToCheck = new Date(startDate);
    while (currentDateToCheck <= currentDate) {
      if (currentDateToCheck.getDay() === 0) {
        return true;
      }
      currentDateToCheck.setDate(currentDateToCheck.getDate() + 1);
    }
    return false;
  }

  getAchievements() {
    this.Achievements.getAchievements(this.currentUser)
      .subscribe({
        next: (achievements) => {
          this.user_achievements = achievements;
        },
        error: (error) => {
          console.error('An error occurred:', error);
        },
        complete: () => { }
      });
  }

  Urgency(date1: Date, date2: Date): number {
    const mSecPerDay = 1000 * 60 * 60 * 24;
    const timeDiffMs = date2.getTime() - date1.getTime();
    const timeDiffFromNow = date2.getTime() - (new Date()).getTime();
    const urgency = 1 - ((timeDiffFromNow / mSecPerDay) / (timeDiffMs / mSecPerDay));
    return urgency;
  }

  Weight(urgency: number, priority: number): number {
    const UrgencyWeight = .8;
    const PriorityWeight = .2;
    const NormalizePriority = Math.max(0, Math.min(1, priority));
    const NormalizeUrgency = Math.max(0, Math.min(1, urgency));
    const weight = (UrgencyWeight * NormalizeUrgency) + (PriorityWeight * NormalizePriority);
    return weight;
  }
  applyFilter(): void {
    if (this.selectedFilter === 'newest') {
      this.tasks.sort((a, b) => new Date(b.TimeStamp).getTime() - new Date(a.TimeStamp).getTime());
    } else if (this.selectedFilter === 'closestDueDate') {
      this.tasks.sort((a, b) => {
        const dueDateA = new Date(a.DueDate).getTime();
        const dueDateB = new Date(b.DueDate).getTime();

        if (dueDateA === dueDateB) {
          // If due dates are the same, sort by priority (high to low)
          return b.Importance - a.Importance;
        }

        return dueDateA - dueDateB;
      });
    }
  }
}
