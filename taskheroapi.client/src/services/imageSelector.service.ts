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
        return "assets/profilePics/1.jpeg";
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

  reversePickPic(imageString: string): string {
    switch (imageString) {
      case "assets/profilePics/1.jpeg":
        return "image1";
      case "assets/profilePics/2.png":
        return "image2";
      case "assets/profilePics/3.png":
        return "image3";
      case "assets/profilePics/4.png":
        return "image4";
      case "assets/profilePics/5.png":
        return "image5";
      default:
        return "default";
    }
  }
}
