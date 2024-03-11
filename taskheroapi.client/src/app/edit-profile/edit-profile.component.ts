import { Component } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {

  fullname: string = "full name"; 
  username: string = "username"; 
  avatarLink: string = "assets/gis/dog.jpeg";
  userBio:string = "the user bio goes here";
}
