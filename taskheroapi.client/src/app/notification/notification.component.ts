import { Component, Input, OnInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent implements OnInit{

  @Input() message: string | undefined; 
  @Input() color: string = "#198754";
  @Input() wordcolor: string = "#bebebe";
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.color);
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
