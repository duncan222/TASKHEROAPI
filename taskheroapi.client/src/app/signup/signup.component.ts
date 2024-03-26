import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.inteface'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  //default user model. Manage default account creation settings here
  user: IUser = {
    Score: 0,
    UserName: '',
    Image: 'default',
    UserSettings: {
      Discoverability: false, ScorePrivacyID: 1, FeedPrivacyID: 1, ThemeId: 1, AvatarId: 1
    },
    UserAccount: {
      Email: '', Password: '', PhoneNumber: ''
    },
    UserAchievements: {
      BadgeID: 1,
      weeklyProgress: 0,
      dailyTracker: 0, 
      totalScore: 0, 
      lastActive: "", //idk what to put for this?
      UnlockedAchievements: [], LockedAchievements: []
    }
  };
  confirmPassword: string = '';
  loading = false;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private loadingService: LoadingService) { }

  onSignUp() {
    console.log('onSignUp triggered');
    if (this.user.UserAccount.Password !== this.confirmPassword) {
      this.errorMessage = 'Error: Passwords do not match';
      return;
    }

    if ((this.user.UserAccount.Email == '') || (this.user.UserName == '') || (this.user.UserAccount.Password == '') || (this.confirmPassword == '')) {
      this.errorMessage = "Error: One or more required fields were left blank";
      return;
    }

    this.errorMessage = '';

    this.loading = true;

    this.userService.post(this.user).subscribe(
      (response) => {
        console.log('User signed up successfully', response);
        this.authService.setLoggedInUserId(response.userId);
        this.router.navigate(['/home'])
      },
      (error) => {
        //handle error
        console.error('Sign-Up error', error);
        this.loading = false;
      }
    );
  }
}
