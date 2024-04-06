import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { FollowerService } from '../../services/follower.service';
import { LoadingService } from '../../services/loading.service';
import { Achievements } from '../../services/achievements.service';
import { userAchievements } from '../../services/userAchievement.service';
import { AudioService } from '../../services/audioservice.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit {

  pageUserId: number = 0;
  currentLoggedInUserId: number | null = 0;
  badgeLevel: string = "assets/gis/goldbadge.png";
  followersNumber: number = 0;
  username: string = "username";
  totalScore: number = 0;
  achievementNumber: number = 0;
  avatarLink: string = "assets/profilePics/default.png";
  notifText: string = "";
  isFollowerAddedOpen: boolean = false;
  isUnfollowedOpen: boolean = false;
  unfollowNotifText: string = "";
  following: any[] = [];
  isFollow: boolean = false;
  achievementBadges: any;
  userBadge: string = "";
  user_achievements: any;
  empty_ach: string = "/assets/icons/empty_ach.png";
  showNotification: boolean = false;
  notificationMessage: string = "";
  wordcolor: string = "";
  color: string = "";
  showImagePop = false;
  photoChoice: string = "";
  typeChoice: string = "";

  constructor(private audioService: AudioService, private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService,
    private imageSelector: ImageSelectorService, private followerService: FollowerService, private loadingService: LoadingService, private achievements: Achievements, private AchievementService: userAchievements) { }

  ngOnInit(): void {
    this.loadingService.show();
    this.currentLoggedInUserId = this.authService.getLoggedInUserId();
    this.pageUserId = Number(this.route.snapshot.params['userId']);

    this.AchievementService.getAchievements(this.pageUserId)
    .subscribe({
      next: (acheivements) => {
        this.user_achievements = acheivements;
      },
      error: (error) => {
        console.error('An error occurred:', error);
      },
      complete: () => {    this.achievementBadges = this.achievements.getAcheivementsPics(this.user_achievements.unlockedAchievements);
        var badgeInfo = this.achievementBadges.find((badge: { type: string; }) => badge.type == 'Level');
        if(badgeInfo != undefined){
          this.badgeLevel = badgeInfo.title; 
          this.userBadge = badgeInfo.path;
          this.achievementBadges = this.achievementBadges.filter((achievement: { type: string; }) => achievement.type !== 'Level');
          this.achievementNumber = this.achievementBadges.length; 
        }}
    });
    this.userService.getUserById(this.pageUserId).subscribe(
      (pageUserDetails) => {
        this.username = pageUserDetails.userName;
        this.totalScore = pageUserDetails.score;
        this.avatarLink = this.imageSelector.pickPic(pageUserDetails.image);
        //not sure how to get number of achievements
        this.loadingService.hide();
      }
    );
    this.followerService.getFollowersById(this.pageUserId).subscribe(
      (pageUserFollowers) => {
        for (const followedUser of pageUserFollowers) {
          this.followersNumber++;
        }
        this.loadingService.hide();
      }
    );
    this.followerService.getFollowingById(this.currentLoggedInUserId).subscribe({
      next: (userFollowing) => {
        this.following = userFollowing;
      },
      complete: () => {
        this.isFollow = this.following.some(item => item.userId === this.pageUserId)
        console.log(this.following);
        console.log(this.isFollow);
      }
  });
  }


  playSound(choice: number): void {
    if(choice == 1){
      this.audioService.loadSound('assets/sounds/click1.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 2){
      this.audioService.loadSound('assets/sounds/click2.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 3){
      this.audioService.loadSound('assets/sounds/gainprogress.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 4){
      this.audioService.loadSound('assets/sounds/lostprogress.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 5){
      this.audioService.loadSound('assets/sounds/addingclick.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 6){
      this.audioService.loadSound('assets/sounds/bonus.mp3'); // Assuming click.mp3 is in the assets folder
      console.log("here")
      this.audioService.play();
    }
    if(choice == 7){
      console.log("here")
      this.audioService.loadSound('assets/sounds/losst.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
    if(choice == 8){
      this.audioService.loadSound('assets/sounds/progressandpoints.mp3'); // Assuming click.mp3 is in the assets folder
      this.audioService.play();
    }
  }


  addFollower(): void {
    this.followerService.addFollower(this.pageUserId, this.currentLoggedInUserId).subscribe(
      (response) => {
        console.log("Following successfully", response);
        this.notifText = `Now Following ${this.username}!`;
        this.followersNumber++;
    
        var this_user: any; 
        //************* fix this, should be an achievment ********************************************** */
        if(this.currentLoggedInUserId != null){
          this.AchievementService.getAchievements(this.currentLoggedInUserId)
          .subscribe({
            next: (acheivements) => {
              this_user = acheivements;
            },
            error: (error) => {
              console.error('An error occurred:', error);
            },
            complete: () => {    
              var locked_and_unlocked = this.achievements.determineAcheivements(this_user.unlockedAchievements, this_user.lockedAchievements, this_user.dailyTracker, 'follow others', this_user.tasksCompleted);
              console.log(locked_and_unlocked[2]);

              if(locked_and_unlocked[2].length != 0){
                this.playSound(6)
                this.typeChoice="achievement"; 
                var pics = this.achievements.getAcheivementsPics(locked_and_unlocked[2]);
                this.photoChoice = pics[0].path;
                console.log(this.photoChoice);
                this.showImagePop = true;
                setTimeout(() => {
                  this.showImagePop = false;
                }, 4000); 
              }
            else{
              this.playSound(5)
            }}
          });
      }
      },
      (error) => {
        console.log("Error:", error);
        if (error.status === 409) {
          this.notifText = "Error: You are already following this user";
        } else {
          this.notifText = "An error occured while attempting to follow this user";
        }
      }
    );
    this.isFollow = true;
    this.showFollowNotif();
  }

  deleteFollower(): void {
    this.followerService.unfollowUser(this.currentLoggedInUserId, this.pageUserId).subscribe(
      (response) => {
        this.playSound(1)
        console.log("Unfollowed successfully", response);
        this.unfollowNotifText = `Unfollowed ${this.username}!`;
        this.followersNumber--;
      },
      (error) => {
        console.log("Error:", error);
        if (error.status === 409) {
          this.unfollowNotifText = "Error: You are not currently following this user";
        } else {
          this.unfollowNotifText = "An error occured while attempting to unfollow this user"
        }
      }
    );
    this.isFollow = false;
    this.showUnfollowNotif();
  }

  showFollowNotif(): void {
    this.notificationMessage = "You followed " + this.username + "!";
    this.color = "#A8EFFF";
    this.wordcolor = "#212121";
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000); 
  }

  showUnfollowNotif(): void {
    this.notificationMessage = "Unfollowed " + this.username + "!";
    this.color = "#A8EFFF";
    this.wordcolor = "#212121";
    this.showNotification = true;
    setTimeout(() => {
      this.showNotification = false;
    }, 5000); 
  }
}
