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
        return "assets/icons/defaultpic.png";
      case "image2":
        return "assets/profilePics/superhero1.png";
      case "image3":
        return "assets/profilePics/3.png";
      case "image4":
        return "assets/profilePics/4.png";
      case "image5":
        return "assets/profilePics/5.png";
      case "image6":
        return "assets/profilePics/6.png";
      case "image7":
        return "assets/profilePics/7.png";
      case "image8":
        return "assets/profilePics/8.png";
      case "image9":
        return "assets/profilePics/9.png";
      case "image10":
        return "assets/profilePics/10.png";
      default:
        return "assets/profilePics/default.png";
    }
  }

  reversePickPic(imageString: string): string {
    switch (imageString) {
      case "assets/icons/defaultpic.png":
        return "image1";
      case "assets/profilePics/superhero1.png":
        return "image2";
      case "assets/profilePics/3.png":
        return "image3";
      case "assets/profilePics/4.png":
        return "image4";
      case "assets/profilePics/5.png":
        return "image5";
      case "assets/profilePics/6.png":
        return "image6";
      case "assets/profilePics/7.png":
        return "image7";
      case "assets/profilePics/8.png":
        return "image8";
      case "assets/profilePics/9.png":
        return "image9";
      case "assets/profilePics/10.png":
        return "image10";
      default:
        return "default";
    }
  }
}
