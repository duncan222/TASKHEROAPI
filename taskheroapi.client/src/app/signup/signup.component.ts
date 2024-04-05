import { Component } from '@angular/core';
import { UserService } from '../../services/user.service';
import { IUser } from '../../interfaces/user.inteface'
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { LoadingService } from '../../services/loading.service';
import { userAchievements } from '../../services/userAchievement.service';
import { IUserAchievements } from '../../interfaces/userachievements.interface';

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
    Image: 'image1',
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
      lastActive: new Date().toDateString(),
      UnlockedAchievements: ['Novice'], LockedAchievements: ['Pro','Elite','Expert','Lonesome No More', 'First Blood', 'Task Hero', '100 Tasks Completed', '200 Tasks Completed', 'Task Master', 'Justice Prevails', 'Monday Inc', 'Sunday Night', 'Dead Lines', 'Stale Coffee', 'The Hangover'], weeklytasks: 0, 
      tasksCompleted: 0, 
      villainLevel: 0
    }
  };
  confirmPassword: string = '';
  loading = false;
  errorMessage: string = '';

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private loadingService: LoadingService, private userAchievements: userAchievements) { }

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
        console.log(response.userId);
        console.log('User signed up successfully', response);
        this.authService.setLoggedInUserId(response.userId);
        var user_achievements: IUserAchievements = {
          UserId: response.userId,
          BadgeID: 1,
          weeklyProgress: 0,
          dailyTracker: 0, 
          totalScore: 0, 
          lastActive: new Date().toDateString(),
          UnlockedAchievements: ['Novice'], LockedAchievements: ['Pro','Elite','Expert','Lonesome No More', 'First Blood', 'Task Hero', '100 Tasks Completed', '200 Tasks Completed', 'Task Master', 'Justice Prevails', 'Monday Inc', 'Sunday Night', 'Dead Lines', 'Stale Coffee', 'The Hangover'], weeklytasks: 0, 
          tasksCompleted: 0, 
          villainLevel: 0
        }
        this.userAchievements.add(response.userId, user_achievements).subscribe({ 
          next: (data) => { 
            console.log(data);
          },
          error: (error) => { 
            console.log(error);
          }, 
          complete: () => {
            this.router.navigate(['/home'])
          }
        })
      },
      (error) => {
        //handle error
        console.error('Sign-Up error', error);
        this.loading = false;
      }
    );
  }
}
