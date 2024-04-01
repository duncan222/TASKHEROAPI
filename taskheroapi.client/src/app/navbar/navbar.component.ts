import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { AddTaskComponent } from '../add-task/add-task.component';
import { AddTask } from '../../services/addtask.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  constructor(private authService: AuthService, private router: Router,public AddTask: AddTask) { }

  task_toggle: boolean = false;

  taskPopup(): void { 
    this.AddTask.toggleModal();
    if(this.task_toggle == false){
      this.task_toggle = true;
    }
    else if(this.task_toggle == true){ 
      this.task_toggle = false; 
      this.refreshPage(); 
    }
  }

  refreshPage() {
    // Refresh logic here
    window.location.reload();
  }
  
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
