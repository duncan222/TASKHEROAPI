import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { achievementBadge } from '../../interfaces/achievementBadge.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.inteface'
import { ImageSelectorService } from '../../services/imageSelector.service';
import { FollowerService } from '../../services/follower.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private imageSelector: ImageSelectorService, private followerService: FollowerService) { }

  // set up a ngonit function to update all the values on the screen to be that of the current user 

  profileImageUrl: string | null = null;
  achievementBadges: achievementBadge[] = []
  currentUser: number | null | undefined;


  badgeLevel: string = "assets/gis/goldbadge.png";
  followersNumber: number = 0;
  username: string = "username";
  totalScore: number = 0;
  achievementNumber: number = 0;
  avatarLink: string = "assets/profilePics/default.png";

  showEditProf = false; 

  openPopup() { 
    this.showEditProf = true; 
  }

  closePopup() { 
    this.showEditProf = false; 
  }

  editAvatar() {
    this.router.navigate(['edit-avatar']);
  }

  redirectEditProfile(){ 
    this.router.navigate(['/edit']);
  }

  redirectSettings(){ 
    this.router.navigate(['/settings']);
  }

  userProfile: any

  ngOnInit(): void {
    this.currentUser = this.authService.getLoggedInUserId();
    this.userService.getUserById(this.currentUser).subscribe(
      (userDetails) => {
        this.username = userDetails.userName;
        this.totalScore = userDetails.score;
        this.avatarLink = this.imageSelector.pickPic(userDetails.image);
        //not sure how to get number of achievements
      }
    );
    this.followerService.getFollowersById(this.currentUser).subscribe(
      (userFollowers) => {
        for (const followedUser of userFollowers) {
          this.followersNumber++;
        }
      }
    );
  }

}
