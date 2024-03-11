import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    if (this.authService.isLoggedIn()) {
      //Get logged-in user
      const loggedInUserId = this.authService.getLoggedInUserId();
      //From here call whatever endpoints you need to call to get necessary data
    }
    else {
      this.router.navigate(['/login']);
    }
  }

  title = 'taskheroapi.client';
}
