// social.component.ts

import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FriendsService } from '../../services/friends.service';

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
  friendsList: any[] = [];
  allUsersList: any[] = [];
  searchTestData: any[] = [];

  constructor(private authService: AuthService, private router: Router, private friendsService: FriendsService, private userService: UserService) { }

  ngOnInit() {
    // Set the initial state when the component is initialized
    this.updateActiveBar();
    //populate All Users List
    this.userService.get().subscribe(
      (users) => {
        for (const user of users) {
          this.allUsersList.push({ username: user.userName, points: user.score })
        }
      }
    );
    //populate Friends List - work in progress
    this.currentUser = this.authService.getLoggedInUserId();
    this.friendsService.getById(this.currentUser).subscribe(
      (userDetails) => {
        this.handleUserFriends(userDetails);
      },
      (error) => {
        console.error('Error fetching friends for user', error);
      }
    );
    this.friendsList.push({ username: 'Friend1', points: 100 })
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

  private handleUserFriends(userDetails: any): void {
    const friendIds = userDetails.freindsUserId || [];

    //need to rethink friend data layout

    /**
    for (const id in friendIds) {
      this.userService.getUserById(Number(id)).subscribe(
        (userInfo) => {
          console.log(userInfo);
        }
      );
    }
    **/
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
}


