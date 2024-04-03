// social.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { LoadingService } from '../../services/loading.service';
import { userAchievements } from '../../services/userAchievement.service';


// note to duncan: add top three leaderboard in social 

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  currentUser: number | null | undefined;
  isFriendsActive: boolean = true;
  SearchActive: boolean = false;
  activeBarLeft: string = '0%';
  isSearchPopupOpen: boolean = false;
  isFriendAddedOpen: boolean = false;
  searchQuery: string = '';
  followingList: any[] = [];
  allUsersList: any[] = [];
  searchTestData: any[] = [];
  user_achievements: any; 
  first: any; 
  second: any; 
  third: any; 
  losers: any[] = []; 

  constructor(private authService: AuthService, private AchievementService: userAchievements, private router: Router, private followerService: FollowerService, private userService: UserService, private imageSelector: ImageSelectorService, private loadingService: LoadingService) { }

  ngOnInit() {
    this.loadingService.show();
    // Set the initial state when the component is initialized
    this.updateActiveBar();
    //populate All Users List
    this.userService.get().subscribe(
      (users) => {
        for (const user of users) {
          this.allUsersList.push({ id: user.userId, avatar: this.imageSelector.pickPic(user.image), username: user.userName, points: user.score })
        }
        this.allUsersList.sort((a, b) => b.points - a.points);
        this.loadingService.hide();
      }
    );
    //populate Friends List
    this.currentUser = this.authService.getLoggedInUserId();

    // get achievements, need either achievements or user scores for the followin, not sure how its done here though .. 
    this.followerService.getFollowingById(this.currentUser).subscribe(
      (followedUsers) => {
        for (const followedUser of followedUsers) {
          this.followingList.push({ id: followedUser.userId, avatar: this.imageSelector.pickPic(followedUser.image), username: followedUser.userName, points: followedUser.score })
        }

        this.followingList.sort((a, b) => b.points - a.points);

        //top three in the list, used for top three positions 
        this.first = this.followingList[0]; 
        this.second = this.followingList[1]; 
        this.third = this.followingList[2]; 

        //the rest of the people (losers lol)
        this.losers = this.followingList.slice(2);

        console.log(this.losers);

        this.loadingService.hide();
      },
      (error) => {
        console.error('Error fetching friends for user', error);
        this.loadingService.hide();
      }
    );
  }

  showFriends() {
    this.SearchActive = false;
    this.isFriendsActive = true;
    this.updateActiveBar();
  }

  showAllUsers() {
    this.SearchActive = false;
    this.isFriendsActive = false;
    this.updateActiveBar();
  }

  toggleSearch() {
    this.searchTestData = [];
    this.SearchActive = true;
    this.activeBarLeft = '74.8%';
  }

  toggleFriendAdded() {
    this.isFriendAddedOpen = !this.isFriendAddedOpen;
    this.showFriendAddedPopup();
  }

  private showFriendAddedPopup() {
    this.isFriendAddedOpen = true;
    setTimeout(() => {
      this.isFriendAddedOpen = false;
    }, 2000);
  }

  private updateActiveBar() {
    // Update the activeBarLeft based on the isFriendsActive state
    this.activeBarLeft = this.isFriendsActive ? '9%' : '41.2%';
  }

  onSearchInputChange() {

  }

  searchUsers() {
    this.searchTestData = [];

    const matchingUsers = this.allUsersList.filter(user => {
      return user.username.toLowerCase().includes(this.searchQuery.toLowerCase());
    });

    this.searchTestData = matchingUsers;

    this.searchQuery = '';
  }

  viewUserProfile(userId: number) {
    this.router.navigate(['/user-profile', userId])
  }
}


