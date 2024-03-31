import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { achievementBadge } from '../../interfaces/achievementBadge.interface';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.inteface'
import { ImageSelectorService } from '../../services/imageSelector.service';
import { FollowerService } from '../../services/follower.service';
import { LoadingService } from '../../services/loading.service';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';
import { Achievements } from '../../services/achievements.service';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private imageSelector: ImageSelectorService, private followerService: FollowerService, private loadingService: LoadingService, private achievements: Achievements, private AchievementService: userAchievements) { }

  // set up a ngonit function to update all the values on the screen to be that of the current user 

  profileImageUrl: string | null = null;
  achievementBadges: achievementBadge[] = []
  currentUser: number | null | undefined;
  user_achievements: any;
  badgeLevel: string = "assets/gis/goldbadge.png";
  badgeName: string = ""
  followersNumber: number = 0;
  username: string = "username";
  totalScore: number = 0;
  achievementNumber: number = 0;
  avatarLink: string = "assets/profilePics/default.png";
  empty_ach: string = "/assets/icons/empty_ach.png";


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

  //getting the users acheivments and progress till reaching the next one 
  getAchievments(){ 
    if(this.currentUser != null && this.currentUser != undefined){
      this.AchievementService.getAchievements(this.currentUser)
      .subscribe({
        next: (acheivements) => {
          this.user_achievements = acheivements;
        },
        error: (error) => {
          console.error('An error occurred:', error);
        },
        complete: () => {
          this.achievementBadges = this.achievements.getAcheivementsPics(this.user_achievements.unlockedAchievements);
          var badgeInfo = this.achievementBadges.find(badge => badge.type == 'Level');
          if(badgeInfo != undefined){
            this.badgeName = badgeInfo.title; 
            this.badgeLevel = badgeInfo.path;
          }
          this.achievementBadges = this.achievementBadges.filter(achievement => achievement.type !== 'Level');
          this.achievementNumber = this.achievementBadges.length; 
        }
      });
    }
  }

  userProfile: any

  ngOnInit(): void {
    this.loadingService.show();
    this.currentUser = this.authService.getLoggedInUserId();
    this.userService.getUserById(this.currentUser).subscribe(
      (userDetails) => {
        this.username = userDetails.userName;
        this.totalScore = userDetails.score;
        this.avatarLink = this.imageSelector.pickPic(userDetails.image);
        //not sure how to get number of achievements
        this.loadingService.hide();
      }
    );
    this.followerService.getFollowersById(this.currentUser).subscribe(
      (userFollowers) => {
        for (const followedUser of userFollowers) {
          this.followersNumber++;
        }
        this.loadingService.hide();
      }
    );
    this.getAchievments(); 
  }

}
