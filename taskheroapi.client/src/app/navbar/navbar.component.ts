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

  taskPopup(): void { 
    this.AddTask.toggleModal();
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
