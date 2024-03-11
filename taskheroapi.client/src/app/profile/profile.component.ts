import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { achievementBadge } from '../../interfaces/achievementBadge.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router) { }


  // set up a ngonit function to update all the values on the screen to be that of the current user 

  profileImageUrl: string | null = null;
  achievementBadges: achievementBadge[] = []

  badgeLevel: string = "assets/gis/goldbadge.png";
  friendsNumber: number = 0;
  username: string = "username";
  fullname: string = "full name"; 
  totalScore: number = 0;
  achievementNumber: number = 0;
  avatarLink: string = "assets/gis/dog.jpeg";
  userBio:string = "the user bio goes here";

  showEditProf = false; 

  openPopup() { 
    this.showEditProf = true; 
  }

  closePopup() { 
    this.showEditProf = false; 
  }


  redirectEditProfile(){ 
    this.router.navigate(['/edit'])
  }

  redirectSettings(){ 
    this.router.navigate(['/settings'])
  }


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
