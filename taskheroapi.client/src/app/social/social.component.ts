// social.component.ts

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-social',
  templateUrl: './social.component.html',
  styleUrls: ['./social.component.css']
})
export class SocialComponent implements OnInit {
  isFriendsActive: boolean = true;
  activeBarLeft: string = '0%';
  displayedUserList: any[] = [
    { username: 'User1', points: 100 },
    { username: 'User2', points: 150 },
    { username: 'User3', points: 80 },
    { username: 'User4', points: 120 },
    // Add more test users as needed
  ];

  ngOnInit() {
    // Set the initial state when the component is initialized
    this.updateActiveBar();
  }

  showFriends() {
    this.isFriendsActive = true;
    this.updateActiveBar();
    // Add logic to populate displayedUserList with friends
  }

  showAllUsers() {
    this.isFriendsActive = false;
    this.updateActiveBar();
    // Add logic to populate displayedUserList with all users
  }

  private updateActiveBar() {
    // Update the activeBarLeft based on the isFriendsActive state
    this.activeBarLeft = this.isFriendsActive ? '0%' : '50%';
  }
}


