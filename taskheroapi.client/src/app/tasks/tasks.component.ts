import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      //Get logged-in user
      const loggedInUserId = this.authService.getLoggedInUserId();
      //From here call whatever endpoints you need to call to get necessary data
    }
    else {
      this.router.navigate(['/login']);
    }
  }
}
