import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { achievementBadge } from '../../interfaces/achievementBadge.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.inteface'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router, private userService: UserService) { }

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

  userProfile: any

  ngOnInit(): void { }

}
