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
import { UserService } from '../../services/user.service';

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
  comicChoice: string = "";
  comicExpressions: string[] = ['/assets/icons/kaboom.png', '/assets/icons/boom.png', '/assets/icons/pow.png', '/assets/icons/kapow.png', '/assets/icons/bang.png'];
  showImagePop = false;
  ProgressCount: number = 0;
  totalScore: number = 0;
  userdetails: any = "";

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder,
    private taskService: userTask,
    private authService: AuthService,
    private Achievements: userAchievements,
    private achievements: Achievements,
    private dialog: MatDialog,
    private userService: UserService
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
    this.userService.getUserById(this.currentUser).subscribe({
      next: (userDetails) => {
        this.userdetails = userDetails;
      }
      ,
      complete: () => {
        console.log(this.userdetails);
      }
    }
    );
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

        var locked_and_unlocked = this.achievements.determineAcheivements(
          this.user_achievements.unlockedAchievements,
          this.user_achievements.lockedAchievements,
          this.user_achievements.dailyTracker,
          "add task",
          this.user_achievements.tasksCompleted
        );

        // Add the submitted task to the tasks array
        this.tasks.push(taskInstance);
        // Clear the form after submission
        this.taskGroup.reset();

        console.log(taskInstance);

        var weeklytask = 0; 

        this.taskService.addTask(this.currentUser, taskInstance).subscribe(
          response => {
            console.log("added")
            this.notificationMessage = "Task Added!"
            this.color = "#198754";
            this.showNotification = true;
            if (this.calculateSunday(taskInstance.DueDate)) {
              console.log("post")
              weeklytask = 1;
            }
            var AchievemtUpdate: IUserAchievements = {
              UserId: this.currentUser,
              BadgeID: this.user_achievements.badgeID,
              weeklyProgress: this.user_achievements.weeklyProgress,
              dailyTracker: this.user_achievements.dailyTracker,
              totalScore: this.user_achievements.totalScore,
              lastActive: this.user_achievements.lastActive,
              UnlockedAchievements: locked_and_unlocked[0],
              LockedAchievements: locked_and_unlocked[1],
              weeklytasks: this.user_achievements.weeklytasks + weeklytask,
              tasksCompleted: this.user_achievements.tasksCompleted,
              villainLevel: this.user_achievements.villainLevel
            }

            this.updateAchievements(this.currentUser, AchievemtUpdate);

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
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: { message: 'Have you completed this task?' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(task.TaskId);
        this.taskService.deleteTask(task.TaskId).subscribe(
          (response) => {
            console.log("Task successfully completed", response);
            this.comicChoice = this.comicExpressions[Math.floor(Math.random() * 5)];
            this.showImagePop = true;
            setTimeout(() => {
              this.showImagePop = false;
            }, 2000);
            this.handleProgressUpdate(task);
          },
          (error) => {
            console.log("Error marking task as complete", error);
          }
        );
      }
    });
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

  handleProgressUpdate(task: any) {
    // update score and daily streak (using weigth * multiplier ? i guess this is how many days until due. reward for not precrastinating)
    var multiplier_percentage = (new Date().getTime() - new Date(task.timeStamp).getTime()) / (new Date(task.dueDate).getTime() - new Date(task.timeStamp).getTime());
    var addition_to_score = task.importance / multiplier_percentage;
    var multiplier = 1;

    if (addition_to_score >= 1000) {
      multiplier = parseInt(addition_to_score.toString()[0]) + 1;
    }
    else if (addition_to_score < 0.0 && addition_to_score > -1000) {
      multiplier = -1
    }
    else if (addition_to_score <= -1000) {
      multiplier = parseInt(addition_to_score.toString()[0] + addition_to_score.toString()[1]) - 1;
    }

    // if the percentage is negative, reset streak to 0, else, increment. 
    if (multiplier_percentage < 0.0) {
      this.user_achievements.dailyTracker = 0;
      //add something to put a notification for + whatever points, or minus whatever points. 
    }
    else {
      this.user_achievements.dailyTracker += 1;
    }

    this.ProgressCount = this.user_achievements.weeklyProgress;

    if (this.hasSundaySinceDate(new Date(this.user_achievements.lastActive))) {
      this.ProgressCount = 0;
    }

    var add_to_progress_count = 0;

    //this is where the error is, also score goes above 100 and tht shit fucks up with styling. fix that. 
    if (this.IsDueBeforeSunday(new Date(task.dueDate))) {
      add_to_progress_count = 1;
    }

    var locked_and_unlocked = this.achievements.determineAcheivements(
      this.user_achievements.unlockedAchievements,
      this.user_achievements.lockedAchievements,
      this.user_achievements.dailyTracker,
      "complete task",
      this.user_achievements.tasksCompleted
    );

    this.totalScore = this.user_achievements.totalScore + (task.importance * multiplier);
    this.userdetails.score = this.totalScore;

    // update score and daily streak -- call to acheivement service. 
    var AchievemtUpdate: IUserAchievements = {
      UserId: this.currentUser,
      BadgeID: this.user_achievements.badgeID,
      weeklyProgress: this.ProgressCount + add_to_progress_count,
      dailyTracker: this.user_achievements.dailyTracker,
      totalScore: this.user_achievements.totalScore + (task.importance * multiplier),
      lastActive: new Date().toDateString(),
      UnlockedAchievements: locked_and_unlocked[0],
      LockedAchievements: locked_and_unlocked[1],
      weeklytasks: this.user_achievements.weeklytasks,
      tasksCompleted: this.user_achievements.tasksCompleted + 1,
      villainLevel: this.user_achievements.villainLevel
    }
    this.updateAchievements(this.currentUser, AchievemtUpdate);

    //updating the users score so it can be shown in the social page/profile. 
    this.userService.put(this.userdetails).subscribe({
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log("good")
        this.refreshPage();
      }
    })
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
        complete: () => {
          this.totalScore = this.user_achievements.totalScore;
          //if there has been a sunday since last active, then determine new progress based on the stuff due. 
          if (this.hasSundaySinceDate(this.user_achievements.lastActive)) {


            //************************************* */
            //first determine the villains fate here



            //then change the villain to the next villain
            //************************************* */
            var taskCount = this.calculateProgress(); 
            this.Achievements.update(this.currentUser,
              {
                UserId: this.currentUser,
                BadgeID: this.user_achievements.badgeID,
                weeklyProgress: this.user_achievements.weeklyProgress,
                dailyTracker: this.user_achievements.dailyTracker,
                totalScore: this.user_achievements.totalScore,
                lastActive: new Date().toDateString(),
                UnlockedAchievements: this.user_achievements.unlockedAchievements,
                LockedAchievements: this.user_achievements.lockedAchievements,
                weeklytasks: taskCount,
                tasksCompleted: this.user_achievements.tasksCompleted,
                villainLevel: this.user_achievements.villainLevel
              })
              .subscribe({
                next: () => {
                }
                ,
                error: error => {
                  console.log('error updating', error);
                }
              });
          }
        }
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

  calculateProgress(): number {

    // getting the date value of 'next sunday'
    const today = new Date();
    const daysOfWeek = today.getDay();
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);

    // filtering the task list for only values between now and then 
    var temp_tasks = this.tasks.filter(task => new Date(task.DueDate) <= nextSunday);

    //returning the length of the filtered tasks... all that for that. has to be easier way 
    return temp_tasks.length;
  }

  IsDueBeforeSunday(Due: Date): boolean {
    const today = new Date();
    const daysOfWeek = today.getDay();
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek;
    const nextSunday = new Date(today);
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);
    return Due <= nextSunday;
  }
}
