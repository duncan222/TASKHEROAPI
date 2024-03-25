import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { FollowerService } from '../../services/follower.service';

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

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService, private userService: UserService, private imageSelector: ImageSelectorService, private followerService: FollowerService) { }

  ngOnInit(): void {
    this.currentLoggedInUserId = this.authService.getLoggedInUserId();
    this.pageUserId = Number(this.route.snapshot.params['userId']);
    this.userService.getUserById(this.pageUserId).subscribe(
      (pageUserDetails) => {
        this.username = pageUserDetails.userName;
        this.totalScore = pageUserDetails.score;
        this.avatarLink = this.imageSelector.pickPic(pageUserDetails.image);
        //not sure how to get number of achievements
      }
    );
    this.followerService.getFollowersById(this.pageUserId).subscribe(
      (pageUserFollowers) => {
        for (const followedUser of pageUserFollowers) {
          this.followersNumber++;
        }
      }
    );
  }

  addFollower(): void {
    console.log(this.currentLoggedInUserId, this.pageUserId);
    this.followerService.addFollower(this.pageUserId, this.currentLoggedInUserId).subscribe(
      (response) => {
        console.log("Following successfully", response);
        this.notifText = `Now Following ${this.username}!`;
      },
      (error) => {
        console.log("Error:", error);
        if (error.status === 409) {
          this.notifText = "Error: You are already following this user";
        } else {
          this.notifText = "An error occured while attempting to follow user";
        }
      }
    );
    this.showFollowNotif();
    //below not working?
    this.followersNumber = 0;
    this.followerService.getFollowersById(this.pageUserId).subscribe(
      (pageUserFollowers) => {
        for (const followedUser of pageUserFollowers) {
          this.followersNumber++;
        }
      }
    );
  }

  showFollowNotif(): void {
    this.isFollowerAddedOpen = true;
    setTimeout(() => {
      this.isFollowerAddedOpen = false;
    }, 5000);
  }
}
