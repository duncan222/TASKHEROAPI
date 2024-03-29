import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthService, private TaskService: userTask, private router: Router, private AchievementService: userAchievements) { 
  }

  comicExpressions: string[] = ['/assets/icons/kaboom.png', '/assets/icons/boom.png', '/assets/icons/pow.png', '/assets/icons/kapow.png', '/assets/icons/bang.png'];
  currentUser: number = 0; 
  tasks: any[] = []; 
  user_achievements: any; 
  //makes more sense for streak to be number of tasks done on time. 
  streak: number = 0;
  ending: string = "";
  streakPicture: string = "";
  showImagePop = false;
  comicChoice: string = "";
  ProgressCount: number = 0;
  progressValue: number = 0;
  userScore: number = 0; 

//when task is complete, display notification from comic expressions 
//call the remove task API service, reposition the top three tasks
  CompleteTaskClick(task: any){ 
    // deleting task and randomly choosing an expression
    // and refreshing the list. 
    this.deletingTask(task.taskId);

    // update score and daily streak (using weigth * multiplier ? i guess this is how many days until due. reward for not precrastinating)
    var multiplier_percentage = (new Date().getTime() - new Date(task.timeStamp).getTime()) / (new Date(task.dueDate).getTime() - new Date(task.timeStamp).getTime()); 
    var addition_to_score = task.importance / multiplier_percentage; 
    var multiplier = 1; 

    if(addition_to_score >= 1000){ 
      multiplier = parseInt(addition_to_score.toString()[0]) + 1;
    }
    else if(addition_to_score < 0.0 && addition_to_score > -1000){ 
      multiplier = -1
    }
    else if(addition_to_score <= -1000){
      multiplier = parseInt(addition_to_score.toString()[0] + addition_to_score.toString()[1]) - 1;
    }

    // if the percentage is negative, reset streak to 0, else, increment. 
    if(multiplier_percentage < 0.0){ 
      this.streak = 0;
    }
    else{ 
      this.streak+=1;
    }

    if(this.hasSundaySinceDate(new Date(this.user_achievements.lastActive))){
      console.log("here")
      this.ProgressCount = 0;
    }

    // update score and daily streak -- call to acheivement service. 
    var AchievemtUpdate: IUserAchievements = {
      UserId: this.currentUser,
      BadgeID: this.user_achievements.badgeID,
      weeklyProgress: this.ProgressCount + 1,
      dailyTracker: this.streak,
      totalScore: this.user_achievements.totalScore + (task.importance * multiplier),
      lastActive: new Date().toDateString(),
      UnlockedAchievements: this.user_achievements.unlockedAchievements,
      LockedAchievements: this.user_achievements.lockedAchievements,
      weeklytasks: this.user_achievements.weeklytasks
    }

    
    this.updateAchievements(this.currentUser, AchievemtUpdate);

    //refreshing the user tasks list and repositioning the top three tasks 
    this.getUserTasks();
  }



  updateAchievements(currentUser: number, acheivement: IUserAchievements): void{ 
    this.AchievementService.update(currentUser, acheivement)
    .subscribe({
      next: () => {
        //successfully updates values of the users ahcievements 
        this.getAchievments(); 
      }
      , 
      error: error => {
        console.log('error updating', error);
      }
    });

  }



  deletingTask(taskID: number): void{ 
    this.TaskService.deleteTask(taskID)
    .subscribe({
      next: () => {
        // chooses a comic expression to relay the success 
        this.comicChoice = this.comicExpressions[Math.floor(Math.random() * 5)];
        this.showImagePop = true;
        setTimeout(() => {
          this.showImagePop = false;
        }, 5000); 
        // refreshing the list 
        this.getUserTasks();
        //call to calaulate progress

      },
      error: error => {
        console.log('error deleting task', error);
      }
  });
  }

  streakFeatures(){
    if(this.streak == 0){ 
      this.ending = "... get to work";
      this.streakPicture = "/assets/icons/ice.png";
    }
    else if(this.streak < 10){
      if(this.streak == 1){
      this.ending = " task done on time ";
      }
      else{
        this.ending = " tasks done on time "
      }
      this.streakPicture = "/assets/icons/newspit.png";
    }

    else if(this.streak >= 10 && this.streak < 20){
      this.ending = " tasks done on time! "
      this.streakPicture = "/assets/icons/spitfiretier2.png";
    }
    else if(this.streak >= 20 && this.streak < 30){
      this.ending = " tasks done on time! "
      this.streakPicture = "/assets/icons/spitfiretier3.png";
    }
    else if(this.streak >= 30 && this.streak < 40){
      this.ending = " tasks done on time!! "
      this.streakPicture = "/assets/icons/spitfiretier4.png";
    }
    else if(this.streak >= 40 && this.streak < 50){
      this.ending = " tasks done on time!! "
      this.streakPicture = "/assets/icons/spitfiretier5.png";
    }
    else if(this.streak >=50){
      this.ending = " tasks done on time!!!   ";
      this.streakPicture = "/assets/icons/toptier.png";
    }
  }



  getUserTasks(): void{ 
    this.TaskService.getUserTasks(this.currentUser)
    .subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log(Object.keys(this.tasks[1]))
        this.streakFeatures();

      }
    });
  }



  //getting the users acheivments and progress till reaching the next one 
  getAchievments(){ 
    this.AchievementService.getAchievements(this.currentUser)
    .subscribe({
      next: (acheivements) => {
        this.user_achievements = acheivements;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        this.streakFeatures();
        this.streak = this.user_achievements.dailyTracker;
        this.ProgressCount = this.user_achievements.weeklyProgress;
        if(this.hasSundaySinceDate(this.user_achievements.lastActive)){
          var taskCount = this.calculateProgress(); 
          this.updateAchievements(
            this.currentUser,     
            {
              UserId: this.currentUser,
              BadgeID: this.user_achievements.badgeID,
              weeklyProgress: this.user_achievements.weeklyProgress,
              dailyTracker: this.user_achievements.dailyTracker,
              totalScore: this.user_achievements.totalScore,
              lastActive: this.user_achievements.lastActive,
              UnlockedAchievements: this.user_achievements.unlockedAchievements,
              LockedAchievements: this.user_achievements.lockedAchievements,
              weeklytasks: taskCount
            }
          );
          if(taskCount != 0){
            this.progressValue = Math.ceil((this.ProgressCount / taskCount) * 100)
        }
        console.log(this.progressValue);
        console.log(this.ProgressCount);  
        }    
        else{ 
          var taskCount: number = this.user_achievements.weeklytasks; 
          if(taskCount != 0){
            this.progressValue = Math.ceil((this.ProgressCount / taskCount) * 100)
          }
        }
      }
    });
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

  // !!! you need to change the database--add weekly items column. ///
  // this only needs to be changes weekly --- if a sunday has passed. --
  // every time a task is added the item should only increment once. 

  // needs to be dynamic, based on when deadlines are considered (weakly by default )
  calculateProgress(): number{ 

    // getting the date value of 'next sunday'
    const today = new Date(); 
    const daysOfWeek = today.getDay(); 
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek; 
    const nextSunday = new Date(today); 
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);

    // filtering the task list for only values between now and then 
    console.log(nextSunday)
    var temp_tasks = this.tasks.filter(task => new Date(task.dueDate) <= nextSunday);
    
    //returning the length of the filtered tasks... all that for that. has to be easier way 
    return temp_tasks.length;
  }



  ngOnInit() { 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    console.log(this.currentUser);
    this.getUserTasks();
    this.getAchievments();
  }

}
