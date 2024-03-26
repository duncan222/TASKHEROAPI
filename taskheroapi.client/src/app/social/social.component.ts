// social.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FollowerService } from '../../services/follower.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  currentUser: number | null | undefined;
  isFriendsActive: boolean = true;
  activeBarLeft: string = '0%';
  isSearchPopupOpen: boolean = false;
  isFriendAddedOpen: boolean = false;
  searchQuery: string = '';
  followingList: any[] = [];
  allUsersList: any[] = [];
  searchTestData: any[] = [];

  constructor(private authService: AuthService, private router: Router, private followerService: FollowerService, private userService: UserService, private imageSelector: ImageSelectorService, private loadingService: LoadingService) { }

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
    this.followerService.getFollowingById(this.currentUser).subscribe(
      (followedUsers) => {
        for (const followedUser of followedUsers) {
          this.followingList.push({ id: followedUser.userId, avatar: this.imageSelector.pickPic(followedUser.image), username: followedUser.userName, points: followedUser.score })
        }
        this.followingList.sort((a, b) => b.points - a.points);
        this.loadingService.hide();
      },
      (error) => {
        console.error('Error fetching friends for user', error);
        this.loadingService.hide();
      }
    );
  }

  showFriends() {
    this.isFriendsActive = true;
    this.updateActiveBar();
  }

  showAllUsers() {
    this.isFriendsActive = false;
    this.updateActiveBar();
  }

  toggleSearchPopup() {
    this.isSearchPopupOpen = !this.isSearchPopupOpen;
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
    this.activeBarLeft = this.isFriendsActive ? '15%' : '65%';
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


