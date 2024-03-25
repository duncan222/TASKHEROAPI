import { Component } from '@angular/core';
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
export class HomeComponent {
  constructor(private authService: AuthService, private TaskService: userTask, private router: Router) { }

  currentUser: number = 0; 
  tasks: IUserTasks[] = []; 
  streak: number = 58;

  getUserTasks(){ 
    this.TaskService.getUserTasks(this.currentUser)
      .subscribe(tasks => { 
        this.tasks = tasks; 
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
    const temp_tasks = this.tasks.filter(task => new Date(task.dueDate) <= nextSunday);

    //temp_tasks.length()

    // needs a value of the items that have been marked off as well. hmmmm. need a new table that resets every week 

  }

  ngOnInit() { 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    this.getUserTasks(); 
    console.log(this.tasks)
  }

}
