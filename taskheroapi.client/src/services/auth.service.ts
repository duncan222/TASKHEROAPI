import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedInUserId: any;

  // Method to set the logged-in user
  setLoggedInUserId(id: any): void {
    this.loggedInUserId = id;
  }

  // Method to check if a user is logged in
  isLoggedIn(): boolean {
    return !!this.loggedInUserId;
  }

  // Method to get the logged-in user
  getLoggedInUserId(): any {
    return this.loggedInUserId;
  }
}
