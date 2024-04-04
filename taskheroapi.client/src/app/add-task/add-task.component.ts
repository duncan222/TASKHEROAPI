import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AddTask } from '../../services/addtask.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { userTask } from '../../services/userTasks.service';
import { AuthService } from '../../services/auth.service'
import { IUserTasks } from '../../interfaces/usertasks.interface';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
import { Achievements } from '../../services/achievements.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})


// need to add functionality when adding task to see if the task ur adding is before the next sunday, and then increment the acheivements. 

export class AddTaskComponent implements OnInit{

  @Output() modalClicked: EventEmitter<void> = new EventEmitter<void>();

  currentUser: number = 0; 
  taskGroup: FormGroup;
  descriptionTemp: String = '';
  showNotification = false;
  notificationMessage = "";
  color = ""
  user_achievements: any; 
  weeklytasks = 0;



  constructor(private AddTask: AddTask, private fb: FormBuilder, private taskService: userTask, private authService: AuthService, private Achievements: userAchievements, private achievements: Achievements) {
    this.taskGroup = this.fb.group({
      title: new FormControl('') , 
      description: new FormControl(''),
      date: new FormControl(new Date()) , 
      priority: new FormControl('') 
    });
  }

  startDate = new Date();
  minDate = new Date();

  ngOnInit(): void{ 
    
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
    this.getAchievments()
  }

  onSubmit(): void {
    if (this.taskGroup.valid && this.taskGroup != null) {
      const descriptionControl = this.taskGroup.get('description'); 
      const dueControl = this.taskGroup.get('date');
      const titleControl = this.taskGroup.get('title'); 
      const priorityControl = this.taskGroup.get('priority'); 

      if(descriptionControl && dueControl && titleControl && priorityControl){ 

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
        }

        var locked_and_unlocked = this.achievements.determineAcheivements(
          this.user_achievements.unlockedAchievements,
          this.user_achievements.lockedAchievements, 
          this.user_achievements.dailyTracker, 
          "add task", 
          this.user_achievements.tasksCompleted
        );

        var weeklytask = 0; 

        console.log(taskInstance);
        this.taskService.addTask(this.currentUser, taskInstance).subscribe(
          response => {
            console.log("added")
            this.taskGroup.reset();
            this.notificationMessage = "Task Added!"
            this.color = "#198754";
            this.showNotification = true;
            console.log("pre")
            console.log(weeklytask)
            if(this.calculateSunday(taskInstance.DueDate)){
              console.log("post")
              weeklytask = 1; 
            }
            console.log(weeklytask)
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
    else {
    }
  }


  updateAchievements(currentUser: number, acheivement: IUserAchievements): void{ 
    this.Achievements.update(currentUser, acheivement)
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

  calculateSunday(due: string): boolean{
    // getting the date value of 'next sunday'
    const today = new Date(); 
    const daysOfWeek = today.getDay(); 
    const daysUntilSunday = daysOfWeek === 0 ? 7 : 7 - daysOfWeek; 
    const nextSunday = new Date(today); 
    nextSunday.setDate(today.getDate() + daysUntilSunday);
    nextSunday.setHours(0, 0, 0, 0);
    //returning the length of the filtered tasks... all that for that. has to be easier way 
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

  getAchievments(){ 
    this.Achievements.getAchievements(this.currentUser)
    .subscribe({
      next: (acheivements) => {
        this.user_achievements = acheivements;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {}
    }
    );
  }

  //computing the urgency by comparing the difference of the current time vs due date and creation time vs due date. 
  //urgency once is supasses the .8 mark should over ride the prioritys.  
  Urgency(date1: Date, date2: Date): number{ 
    const mSecPerDay = 1000.0 * 60.0 * 60.0 * 24.0; 
    const timeDiffMs = (date2.getTime() - date1.getTime()) + 0.0; 
    const timeDiffFromNow = (date2.getTime() - (new Date()).getTime()) + 0.0;
    const urgency = 1.0 - ((timeDiffFromNow/mSecPerDay) / (timeDiffMs /mSecPerDay)); 
    return urgency;
  }

  //computing weight based on the urgency and the priority
  Weight(urgency: number, priority: number): number { 
    const UrgencyWeight = .8; 
    const PriorityWeight = .2;
    //normalizing 
    const NormalizePriority = Math.max(0, Math.min(1, priority));
    const NormalizeUrgency = Math.max(0, Math.min(1, urgency));
    //compute weight 
    const weight = (UrgencyWeight * NormalizeUrgency) + (PriorityWeight * NormalizePriority); 
    return weight; 
  }


  closeModal() {
    this.AddTask.toggleModal();
    this.modalClicked.emit();
  }

}
