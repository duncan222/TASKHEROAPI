import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from '../../interfaces/user.inteface';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserAccountService } from '../../services/userAccount.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private userAccountService: UserAccountService) { }

  userEdits: any = {
    userId: this.authService.getLoggedInUserId(),
    userName: '',
    score: 0,
    image: '',
    userAccount: {
      userId: this.authService.getLoggedInUserId(),
      password: '',
      phoneNumber: '',
      email: '',
    }
  }
  currentUserId: number | null | undefined;
  confirmPassword: string = "";
  errorMessage: string = "";
  loading: boolean = false;

  ngOnInit() {
    this.currentUserId = this.authService.getLoggedInUserId();
    this.userService.getUserById(this.currentUserId).subscribe(
      (userDetails) => {
        this.userEdits.userName = userDetails.userName;
        this.userEdits.score = userDetails.score;
        this.userEdits.image = userDetails.image;
      }
    );
    this.userAccountService.getById(this.currentUserId).subscribe(
      (userDetails) => {
        this.userEdits.userAccount.password = userDetails.password;
        this.userEdits.userAccount.phoneNumber = userDetails.phoneNumber;
        this.confirmPassword = userDetails.password;
        this.userEdits.userAccount.email = userDetails.email;
      }
    );
  }

  cancelChanges() {
    this.router.navigate(['/profile'])
  }

  saveChanges() {
    if ((this.userEdits.userId == '') || (this.userEdits.userName == '') || (this.userEdits.userAccount.password == '') || (this.confirmPassword == '')) {
      this.errorMessage = "Error: One or more required fields were left blank";
      return;
    }

    if (this.confirmPassword !== this.userEdits.userAccount.password) {
      this.errorMessage = "Error: Password do not match";
      return;
    }

    this.userService.put(this.userEdits).subscribe(
      (response) => {
        console.log("User was updated successfully", response);
      },
      (error) => {
        console.log("Error: User was not updated correctly", error);
      }
    );

    this.userAccountService.put(this.userEdits.userAccount).subscribe(
      (response) => {
        console.log("UserAccount was updated successfully", response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log("Error: UserAccount was not updated correctly", error);
      }
    );
  }

}
