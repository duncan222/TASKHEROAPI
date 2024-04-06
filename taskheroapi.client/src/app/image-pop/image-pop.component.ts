

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
  @Input() type: string | undefined; 

  constructor() {
    
  }

  ngOnInit(): void {

  }

  removeNotification(): void {
    const notifcationElement = document.getElementById('notification_2');
    if(notifcationElement){
      notifcationElement.remove();
    }
  }

}
