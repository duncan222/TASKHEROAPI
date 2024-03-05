import { Component } from '@angular/core';
import { NgbProgressbar } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../services/auth.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
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
