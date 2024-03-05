import { Component } from '@angular/core';
import { UserAccountService } from '../../services/userAccount.service'
import { Router } from '@angular/router';

interface userAccounts {
  userId?: number;
  password: string;
  email: string;
  phoneNumber?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loading = false;
  errorMessage: string = '';
  email: string = '';
  password: string = '';
  validUser = false;

  constructor(private userAccountService: UserAccountService, private router: Router) { }

  onLogIn() {
    console.log('onLogIn triggerd')
    this.loading = true;
    this.userAccountService.get().subscribe(
      (response: userAccounts[]) => {

        for (const user of response) {
          
          if ((user.email == this.email) && (user.password == this.password)) {
            this.validUser = true;
          }
        }

        if (this.validUser) {
          console.log('Login successful');
          this.router.navigate(['/home']);
        } else {
          console.log('Login failed. Invalid email or password');
          this.loading = false;
          this.errorMessage = 'Error: Invalid email or password';
        }
      },
      (error) => {
        console.error('API error', error);
      }
    );
  }
}
