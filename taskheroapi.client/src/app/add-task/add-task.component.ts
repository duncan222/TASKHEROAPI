import { Component, OnInit } from '@angular/core';
import { AddTask } from '../../services/addtask.service';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { userTask } from '../../services/userTasks.service';
import { AuthService } from '../../services/auth.service'
import { IUserTasks } from '../../interfaces/usertasks.interface';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.css'
})


export class AddTaskComponent implements OnInit{
  currentUser: number = 0; 
  taskGroup: FormGroup;
  descriptionTemp: String = '';

  constructor(private AddTask: AddTask, private fb: FormBuilder, private taskService: userTask, private authService: AuthService) {
    this.taskGroup = this.fb.group({
      title: ['', Validators.required], 
      description: ['', Validators.required], 
      date: ['', Validators.required], 
      priority: ['', Validators.required] 
    });
  }

  startDate = new Date();
  minDate = new Date();

  ngOnInit(): void{ 
    if(this.authService.getLoggedInUserId != null){
      this.currentUser = Number(this.authService.getLoggedInUserId());
    }
  }

  onSubmit() {
    if (this.taskGroup.valid && this.taskGroup != null) {
      console.log(this.taskGroup.value);

      const descriptionControl = this.taskGroup.get('description'); 
      const dueControl = this.taskGroup.get('date');
      const titleControl = this.taskGroup.get('title'); 
      const priorityControl = this.taskGroup.get('priority'); 

      if(descriptionControl && dueControl && titleControl && priorityControl){ 
                
        const taskInstance: IUserTasks = { 
          descripcion: descriptionControl.value, 
          timeStamp: new Date().toString(), 
          title: titleControl.value, 
          dueDate: dueControl.value, 
          importance: priorityControl.value, 
          weight: number, 
          urgency: number, 
        }
        // this.taskService.addTask(this.currentUser, this.taskGroup.value).subscribe(
        //   response => 
        // )
      }
    }
    else {
    }
  }

  closeModal() {
    this.AddTask.toggleModal();
  }

}
