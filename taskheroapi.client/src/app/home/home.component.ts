import { Component, OnInit } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';
import { userTask } from '../../services/userTasks.service';
import { IUserTasks } from '../../interfaces/usertasks.interface';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit{
  constructor(private authService: AuthService, private TaskService: userTask, private router: Router) { 
  }

  currentUser: number = 0; 
  tasks: any[] = []; 
  streak: number = 50;
  ending: string = "";
  streakPicture: string = "";

  streakFeatures(){
    if(this.streak == 0){ 
      this.ending = "... ";
      this.streakPicture = "/assets/icons/ice.png";
    }
    else if(this.streak < 10){
      if(this.streak == 1){
      this.ending = " day ";
      }
      else{
        this.ending = " days "
      }
      this.streakPicture = "/assets/icons/newspit.png";
    }
    else if(this.streak >= 10 && this.streak < 20){
      this.ending = " days! "
      this.streakPicture = "/assets/icons/spitfiretier2.png";
    }
    else if(this.streak >= 20 && this.streak < 30){
      this.ending = " days! "
      this.streakPicture = "/assets/icons/spitfiretier3.png";
    }
    else if(this.streak >= 30 && this.streak < 40){
      this.ending = " days!! "
      this.streakPicture = "/assets/icons/spitfiretier4.png";
    }
    else if(this.streak >= 40 && this.streak < 50){
      this.ending = " days!! "
      this.streakPicture = "/assets/icons/spitfiretier5.png";
    }
    else if(this.streak >=50){
      this.ending = " days!!!   ";
      this.streakPicture = "/assets/icons/toptier.png";
    }
  }

  getUserTasks(): void{ 
    this.TaskService.getUserTasks(this.currentUser)
      .subscribe((tasks) => { 
        this.tasks = tasks; 
        console.log(this.tasks)

      })
    
  }

  getAchievments(){ 
  }

  getStreak(){
  }

  // once the task is checked, it should be deleted but the weight of the task should be 
  // multiplied by the 
  checkTask(){
      // delete task 

      // update the achievement boared

      // update the total score (weight * the multiplier)

      // update the daily streak 
  }

  

  // needs to be dynamic, based on when deadlines are considered (weakly by default )
  calculateProgress(){ 

    // getting the date value of 'next sunday'
    const today = new Date(); 
    const daysOfWeek = today.getDay(); 
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek; 
    const nextSunday = new Date(today); 
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);

    // filtering the task list for only values between now and then 
    const temp_tasks = this.tasks.filter(task => new Date(task.DueDate) <= nextSunday);

    //temp_tasks.length()

    // needs a value of the items that have been marked off as well. hmmmm. need a new table that resets every week 

  }

  ngOnInit() { 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    this.TaskService.getUserTasks(this.currentUser)
    .subscribe({
      next: (tasks) => {
        this.tasks = tasks;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {
        console.log(this.tasks[2].title);
        console.log(Object.keys(this.tasks[1]))
      }
    });

    this.streakFeatures();
  }

}
