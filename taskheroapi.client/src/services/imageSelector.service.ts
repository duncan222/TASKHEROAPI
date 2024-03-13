import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/user.inteface';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ImageSelectorService {
  pickPic(imageString: string): string {
    switch (imageString) {
      case "image1":
        return "assets/profilePics/1-dog.jpeg";
      case "image2":
        return "assets/profilePics/2.png";
      case "image3":
        return "assets/profilePics/3.png";
      case "image4":
        return "assets/profilePics/4.png";
      case "image5":
        return "assets/profilePics/5.png";
      default:
        return "assets/profilePics/default.png";
    }
  }
}
