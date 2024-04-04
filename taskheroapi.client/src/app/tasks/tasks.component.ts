import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { userTask } from '../../services/userTasks.service';
import { AuthService } from '../../services/auth.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
import { Achievements } from '../../services/achievements.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  currentUser: number = 0;
  taskGroup: FormGroup;
  tasks: IUserTasks[] = []; // Array to store tasks
  user_achievements: any;
  showNotification = false;
  notificationMessage = "";
  color = "";
  weeklytasks = 0;

  constructor(
    private fb: FormBuilder,
    private taskService: userTask,
    private authService: AuthService,
    private Achievements: userAchievements,
    private achievements: Achievements
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
  }

  loadTasks(): void {
    // Load tasks for the current user
    this.taskService.getUserTasks(this.currentUser).subscribe(
      (tasks: IUserTasks[]) => {
        this.tasks = tasks;
      },
      error => {
        console.error('Error loading tasks:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.taskGroup.valid && this.taskGroup != null) {
      const descriptionControl = this.taskGroup.get('description');
      const dueControl = this.taskGroup.get('date');
      const titleControl = this.taskGroup.get('title');
      const priorityControl = this.taskGroup.get('priority');

      if (descriptionControl && dueControl && titleControl && priorityControl) {
        const urgency = this.Urgency(new Date(), dueControl.value);
        const weight = this.Weight(urgency, priorityControl.value);
        const taskInstance: IUserTasks = {
          TaskId: 0,
          UserId: this.currentUser,
          Description: descriptionControl.value,
          TimeStamp: new Date().toString(),
          Title: titleControl.value,
          DueDate: dueControl.value.toString(),
          Importance: priorityControl.value,
          Weight: weight,
          Urgency: urgency,
        };

        // Add the submitted task to the tasks array
        this.tasks.push(taskInstance);
        // Clear the form after submission
        this.taskGroup.reset();

        this.taskService.addTask(this.currentUser, taskInstance).subscribe(
          response => {
            console.log("added")
            this.notificationMessage = "Task Added!"
            this.color = "#198754";
            this.showNotification = true;
            setTimeout(() => {
              this.showNotification = false;
            }, 5000);

            // Reload tasks after adding a new task
            this.loadTasks();
          },
          error => {
            console.error('Error saving todo:', error);
          }
        )
      }
    }
  }


  editTask(task: IUserTasks): void {
    // Implement edit task functionality here
  }

  deleteTask(task: IUserTasks): void {
    // Implement delete task functionality here
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
}
