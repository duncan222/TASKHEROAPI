

import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-image-pop',
  templateUrl: './image-pop.component.html',
  styleUrl: './image-pop.component.css'
})
export class ImagePopComponent implements OnInit{

  topPosition = 0; 
  leftPosition = 0;

  @Input() image: string | undefined; 

  constructor() {
    
  }

  ngOnInit(): void {
    this.topPosition = Math.random() * (window.innerHeight - 100); // Adjust 100 according to your popup height
    this.leftPosition = Math.random() * (window.innerWidth - 100); // Adjust 100 according to your popup width
    setTimeout(() => {
      this.removeNotification(); 
    }, 5000);
  }

  removeNotification(): void {
    const notifcationElement = document.getElementById('notification');
    if(notifcationElement){
      notifcationElement.remove();
    }
  }

}
