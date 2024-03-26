import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ImageSelectorService } from '../../services/imageSelector.service';
import { Router } from '@angular/router';
import { LoadingService } from '../../services/loading.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.css'
})
export class SettingsComponent {
  constructor(private authService: AuthService, private router: Router, private userService: UserService, private loadingService: LoadingService) { }


  logout(): void {
    this.loadingService.showForDuration(2000);
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
