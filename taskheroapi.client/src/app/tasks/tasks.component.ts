import { Component, OnInit } from '@angular/core';
import { AddTask } from '../../services/addtask.service';
import { FormBuilder, FormGroup, Validators, AbstractControl, FormControl } from '@angular/forms';
import { userTask } from '../../services/userTasks.service';
import { AuthService } from '../../services/auth.service'
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})


export class TasksComponent implements OnInit {
  currentUser: number = 0;
  taskGroup: FormGroup;
  descriptionTemp: String = '';
  showNotification = false;
  notificationMessage = "";
  color = ""

  constructor(private AddTask: AddTask, private fb: FormBuilder, private taskService: userTask, private authService: AuthService) {
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
        }

        console.log(taskInstance);
        this.taskService.addTask(this.currentUser, taskInstance).subscribe(
          response => {
            this.taskGroup.reset();
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
    else {
    }
  }

  //computing the urgency by comparing the difference of the current time vs due date and creation time vs due date. 
  //urgency once is supasses the .8 mark should over ride the prioritys.  
  Urgency(date1: Date, date2: Date): number {
    const mSecPerDay = 1000 * 60 * 60 * 24;
    const timeDiffMs = date2.getTime() - date1.getTime();
    const timeDiffFromNow = date2.getTime() - (new Date()).getTime();
    const urgency = 1 - ((timeDiffFromNow / mSecPerDay) / (timeDiffMs / mSecPerDay));
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
  }

}
