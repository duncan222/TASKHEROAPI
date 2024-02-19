import { Component } from '@angular/core';

interface UserAccount {
  UserId: number;
  Password: string;
  Email: string;
  PhoneNumber: number;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

}
