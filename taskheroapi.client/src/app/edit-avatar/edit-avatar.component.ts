import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { ImageSelectorService } from '../../services/imageSelector.service';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './edit-avatar.component.html',
  styleUrls: ['./edit-avatar.component.css']
})
export class EditAvatarComponent {

  constructor(private router: Router, private authService: AuthService, private userService: UserService, private imageSelector: ImageSelectorService) { }

  avatars: string[] = [
    'assets/profilePics/1.jpeg',
    'assets/profilePics/2.png',
    'assets/profilePics/3.png',
    'assets/profilePics/4.png',
    'assets/profilePics/5.png',
  ];
  selectedAvatar: string = '';
  currentUserId: number | null | undefined;
  user: any = {
    userId: this.authService.getLoggedInUserId(),
    userName: '',
    score: 0,
    image: ''
  }

  ngOnInit() {
    this.currentUserId = this.authService.getLoggedInUserId();
    this.userService.getUserById(this.currentUserId).subscribe(
      (userDetails) => {
        this.user.userName = userDetails.userName;
        this.user.score = userDetails.score;
        this.user.image = userDetails.image;
        this.selectedAvatar = this.imageSelector.pickPic(userDetails.image);
      }
    );
  }

  selectAvatar(avatar: string): void {
    this.selectedAvatar = avatar;
  }

  cancelChanges(): void {
    this.router.navigate(['/profile']);
  }

  saveChanges(): void {
    this.user.image = this.imageSelector.reversePickPic(this.selectedAvatar);
    this.userService.put(this.user).subscribe(
      (response) => {
        console.log("User Avatar was updated successfully", response);
        this.router.navigate(['/profile']);
      },
      (error) => {
        console.log("Error: User Avatar was not updated correctly", error);
      }
    );
    this.router.navigate(['/profile']);
  }
}

