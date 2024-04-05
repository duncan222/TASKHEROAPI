import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
import { achievementBadge } from '../../interfaces/achievementBadge.interface';
import { Achievements } from '../../services/achievements.service';
import { ChangeDetectorRef } from '@angular/core';
import { ProgressbarType } from 'ngx-bootstrap/progressbar';
import { UserService } from '../../services/user.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { LoadingService } from '../../services/loading.service';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})

//things to currently fix: 
// -- add notification for losing and gaining points in the score
// -- add notifications for gaining achievements. 
// -- add notification for defeating the villain 
//          -- the villain would be defeated by the health bar (progress bar reversed)
// -- the villain will remain hurt until sunday unless things change and a new item is added 
// -- then the villain will regain its health, accordingly, the villain is only changed every sunday. 
// -- weather you have defeated the villain is only determined when you load the webpage past a sunday. 


export class HomeComponent implements OnInit{
  constructor(private authService: AuthService, private imageSelector: ImageSelectorService, private loadingService: LoadingService, private userService: UserService, private TaskService: userTask, private router: Router, private AchievementService: userAchievements,private cdr: ChangeDetectorRef, private achievements: Achievements) { 
  }

  comicExpressions: string[] = ['/assets/icons/kaboom.png', '/assets/icons/boom.png', '/assets/icons/pow.png', '/assets/icons/kapow.png', '/assets/icons/bang.png'];
  currentUser: number = 0; 
  username: string = "";
  tasks: any[] = []; 
  achievementBadges: achievementBadge[] = [];
  user_achievements: any; 
  avatarLink: string = "assets/profilePics/default.png";
  enemyLink: string = "";
  //makes more sense for streak to be number of tasks done on time. 
  ending: string = "";
  streakPicture: string = "";
  showImagePop = false;
  photoChoice: string = "";
  ProgressCount: number = 0;
  progressValue: number = 100;
  totalScore: number = 0;
  userScore: number = 0; 
  userBadge: string = "";
  badgeLevel: string = "";
  healthStatus: ProgressbarType | undefined= "danger";
  enemyStatus: ProgressbarType | undefined= "success";
  //add the remaining images and stuff and add them to array --------- TODO 
  enemyList: string[][] = [['/assets/icons/mondayprof.png', 'Monday Inc.'], ['/assets/icons/sundayprof.png', 'Sunday Knight']];
  villainPhotos: string[] = ['/assets/icons/monday.png','/assets/icons/sunday.png', '/assets/icons/deadlines.png'];
  achievementPhotos: any = {'First Task': '/assets/icons/firsttask.png', 'First Blood': '/assets/icons/firstblood.png', 'Lonesome No More': '/assets/icons/lonesome.png', '100 Tasks': '/assets/icons/100.png'};
  enemyName: string = "";
  userdetails: any = "";
  dailyTracker: number = 0;
  typeChoice: string = "";
  

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
      this.user_achievements.dailyTracker = 0;
      //add something to put a notification for + whatever points, or minus whatever points. 
    }
    else{ 
      this.user_achievements.dailyTracker +=1;
    }

    this.ProgressCount = this.user_achievements.weeklyProgress;

    if(this.hasSundaySinceDate(new Date(this.user_achievements.lastActive))){
      console.log("here")
      this.ProgressCount = 0;
    }

    var add_to_progress_count = 0; 


    //this is where the error is, also score goes above 100 and tht shit fucks up with styling. fix that. 
    if(this.IsDueBeforeSunday(new Date(task.dueDate))){
      console.log("what");
      add_to_progress_count = 1;
    }

    var locked_and_unlocked = this.achievements.determineAcheivements(
      this.user_achievements.unlockedAchievements,
      this.user_achievements.lockedAchievements, 
      this.user_achievements.dailyTracker, 
      "complete task", 
      this.user_achievements.tasksCompleted
    );

    //************* fix this, should be an achievment ********************************************** */

    // const unlocked = this.user_achievements.unlockedAchievements.split(",");

    // const missingelement = locked_and_unlocked[0].filter(element => !unlocked.includes(element));
    // console.log(missingelement);
    // this.photoChoice=this.achievementPhotos.missingelement;
    // this.typeChoice="achievement"; 
    // this.showImagePop = true;
    // setTimeout(() => {
    //   this.showImagePop = false;
    // }, 2000); 

    console.log(this.user_achievements.weeklytasks);
    console.log(this.ProgressCount);
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
      }
    })
    //refreshing the user tasks list and repositioning the top three tasks 
    this.getUserTasks();
  }



  
  //function for having a pop-up once the propgress bar reaches 100% for the week: 
  //in future notes: this should only be done on sundays. 


  convertDatetoDateString(strdate: string) :string{ 
    var date = new Date(strdate); 
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 to month as it starts from 0
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear().toString();
    return `${month}/${day}/${year}`;
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
        this.photoChoice = this.comicExpressions[Math.floor(Math.random() * 5)];
        this.typeChoice = "comic";
        this.showImagePop = true;
        setTimeout(() => {
          this.showImagePop = false;
        }, 2000); 
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
    if(this.user_achievements.dailyTracker == 0){ 
      this.ending = "... get to work";
      this.streakPicture = "/assets/icons/ice.png";
    }
    else if(this.user_achievements.dailyTracker < 10 && this.user_achievements.dailyTracker > 0){
      if(this.user_achievements.dailyTracker == 1){
      this.ending = " task done on time ";
      }
      else{
        this.ending = " tasks done on time "
      }
      this.streakPicture = "/assets/icons/newspit.png";
    }

    else if(this.user_achievements.dailyTracker >= 10 && this.user_achievements.dailyTracker < 20){
      this.ending = " tasks done on time! "
      this.streakPicture = "/assets/icons/spitfiretier2.png";
    }
    else if(this.user_achievements.dailyTracker >= 20 && this.user_achievements.dailyTracker < 30){
      this.ending = " tasks done on time! "
      this.streakPicture = "/assets/icons/spitfiretier3.png";
    }
    else if(this.user_achievements.dailyTracker>= 30 && this.user_achievements.dailyTracker < 40){
      this.ending = " tasks done on time!! "
      this.streakPicture = "/assets/icons/spitfiretier4.png";
    }
    else if(this.user_achievements.dailyTracker >= 40 && this.user_achievements.dailyTracker < 50){
      this.ending = " tasks done on time!! "
      this.streakPicture = "/assets/icons/spitfiretier5.png";
    }
    else if(this.user_achievements.dailyTracker >=50){
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
        var new_tasks = this.tasks.sort(this.customComparator);
        console.log(new_tasks);
      }
    });
  }

  customComparator(a: any, b: any): number {
    // Primary sort based on urgency
    if ((new Date(b.dueDate).getTime() - new Date().getTime()) < (new Date(a.dueDate).getTime() - new Date().getTime())) {
        return 1;
    } else if ((new Date(b.dueDate).getTime() - new Date().getTime()) > (new Date(a.dueDate).getTime() - new Date().getTime())) {
        return -1;
    } else {
        // Secondary sort based on priority rating
      return b.importance - a.importance;
    }
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
        this.totalScore = this.user_achievements.totalScore;
        this.dailyTracker = this.user_achievements.dailyTracker;
        //if there has been a sunday since last active, then determine new progress based on the stuff due. 
        if(this.hasSundaySinceDate(this.user_achievements.lastActive)){

          var villainScore = 0; 
          var newLevel = this.user_achievements.villainLevel; 
          //************************************* */
          //first determine the villains fate here 
          if(this.user_achievements.weeklyProgress >= this.user_achievements.weeklytasks){
            //villain defeated  

            // pop up, you got the villain now 
            this.photoChoice=this.villainPhotos[this.user_achievements.villainLevel];
            this.typeChoice="villain"; 
            this.showImagePop = true;
            setTimeout(() => {
              this.showImagePop = false;
            }, 2000); 
            // villain now is in subcategorie of achievements 

            // moves to next villain 
            newLevel = this.user_achievements.villainLevel + 1;
            villainScore = 2 * this.user_achievements.villainLevel; 
          }
          else{ 
            //villain not defeated 

            //maybe add a pop up of the super hero getting rocked or somthing if u have time. 

            //you did not defeate the villain notification. another week of torment. 
            //*********  should subtract some points.  */  ( minus 1*villain level + 1);
            villainScore = 0 - (2 * this.user_achievements.villainLevel); 
          }

          //then change the villain to the next villain 
          //************************************* */
          var taskCount = this.calculateProgress(); 
          this.AchievementService.update(this.currentUser,
          {
            UserId: this.currentUser,
            BadgeID: this.user_achievements.badgeID,
            weeklyProgress: this.user_achievements.weeklyProgress,
            dailyTracker: this.user_achievements.dailyTracker,
            totalScore: this.user_achievements.totalScore + villainScore,
            lastActive: new Date().toDateString(),
            UnlockedAchievements: this.user_achievements.unlockedAchievements,
            LockedAchievements: this.user_achievements.lockedAchievements,
            weeklytasks: taskCount, 
            tasksCompleted: this.user_achievements.tasksCompleted, 
            villainLevel: newLevel
          })
          .subscribe({
            next: () => {
            }
            , 
            error: error => {
              console.log('error updating', error);
            }
          });
          if(taskCount != 0){
            this.progressValue = Math.ceil((this.ProgressCount / taskCount) * 100)
            if(this.progressValue > 100){
              this.progressValue = 100;
            }
            if(this.progressValue < 0){
              this.progressValue = 0;
            }
        }
        this.userdetails.score = this.user_achievements + villainScore;
        this.userService.put(this.userdetails).subscribe({
          error: (error) => {
            console.error('An error occurred:', error);
          },
          complete: () => {
            console.log("good")
          }
        });

        }    

        else{ 
          var taskCount: number = this.user_achievements.weeklytasks; 
          if(taskCount != 0){
            this.progressValue = Math.ceil((this.user_achievements.weeklyProgress / taskCount) * 100)
          }
          if(this.progressValue > 100){
            this.progressValue = 100;
          }
          if(this.progressValue < 0){
            this.progressValue = 0;
          }
          if(taskCount == 0){ 
            this.progressValue = 100;
          }
        }


        // maybe
        // if(this.progressValue >= 70){
        //   this.healthStatus = 'success';
        //   this.enemyStatus = 'danger';
        // }
        // if(this.progressValue >= 30 && this.progressValue < 70){
        //   this.healthStatus = 'warning'; 
        //   this.enemyStatus = 'warning';
        // }
        // if(this.progressValue >= 0 && this.progressValue < 30){ 
        //   this.healthStatus = 'danger'; 
        //   this.enemyStatus = 'success';
        // }

        this.achievementBadges = this.achievements.getAcheivementsPics(this.user_achievements.unlockedAchievements);
        var badgeInfo = this.achievementBadges.find(badge => badge.type == 'Level');
        if(badgeInfo != undefined){
          this.badgeLevel = badgeInfo.title; 
          this.userBadge = badgeInfo.path;
        }
        this.enemyLink = this.enemyList[this.user_achievements.villainLevel][0];
        this.enemyName = this.enemyList[this.user_achievements.villainLevel][1];
        this.achievementBadges = this.achievementBadges.filter(achievement => achievement.type !== 'Level');
        this.loadingService.hide();
      }
      
    });
  }

  IsDueBeforeSunday(Due: Date): boolean{ 
    const today = new Date(); 
    const daysOfWeek = today.getDay(); 
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek; 
    const nextSunday = new Date(today); 
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);
    return Due <= nextSunday;
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

  calculateProgress(): number{ 

    // getting the date value of 'next sunday'
    const today = new Date(); 
    const daysOfWeek = today.getDay(); 
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek; 
    const nextSunday = new Date(today); 
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);

    // filtering the task list for only values between now and then 
    var temp_tasks = this.tasks.filter(task => new Date(task.dueDate) <= nextSunday);
    
    //returning the length of the filtered tasks... all that for that. has to be easier way 
    return temp_tasks.length;
  }


  ngOnInit() { 
    this.loadingService.show();
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    this.userService.getUserById(this.currentUser).subscribe({
      next: (userDetails) => {
        this.userdetails = userDetails;
        //not sure how to get number of achievements
      }
      , 
      complete: () => {
        console.log(this.userdetails);
        this.username = this.userdetails.userName;
        this.avatarLink = this.imageSelector.pickPic(this.userdetails.image);
      }
    }
    );
    console.log(this.currentUser);
    this.getUserTasks();
    this.getAchievments();
  }

}
