import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-score-notification',
  templateUrl: './score-notification.component.html',
  styleUrl: './score-notification.component.css'
})

export class ScoreNotificationComponent implements OnInit{

  @Input() message: string | undefined; 
  @Input() wordcolor: string = "$A8EFFF";

  constructor() {
    
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.removeNotification(); 
    }, 3000);
  }

  removeNotification(): void {
    const notifcationElement = document.getElementById('notification');
    if(notifcationElement){
      notifcationElement.remove();
    }
  }

}
