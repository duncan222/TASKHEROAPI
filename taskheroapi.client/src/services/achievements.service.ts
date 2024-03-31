import { Injectable } from '@angular/core';
import { achievementBadge } from '../interfaces/achievementBadge.interface';

@Injectable({
  providedIn: 'root',
})

//this is a service for getting the achievements, basically just a ton of if statements to fetch images and titles 

export class Achievements {

  determineAcheivements(unlocked: string[], locked: string[], streak: number, action: string) { 
    if(action == 'add task'){
      if(locked.includes('Task Hero')){
        unlocked.push("Task Hero"); 
        locked = locked.filter(item => item !== "Task Hero");
      }
    }
    else if(action == 'complete task'){
      if(locked.includes('First Blood')){
        unlocked.push("First Blood"); 
        locked = locked.filter(item => item !== "First Blood");
      }
      if(streak >= 10 && streak < 20){
        if(locked.includes('Pro')){
          unlocked.push("Pro"); 
          locked = locked.filter(item => item !== "Pro");
        }  
      }
      if(streak >= 20 && streak < 30){
        if(locked.includes('Expert')){
          unlocked.push("Expert"); 
          locked = locked.filter(item => item !== "Expert");
        }  
      }
      if(streak >= 30 && streak < 40){
        if(locked.includes('Elite')){
          unlocked.push("Elite"); 
          locked = locked.filter(item => item !== "Elite");
        }  
      }
      if(streak < 10){
        if(unlocked.includes('Pro')){
          locked.push("Pro"); 
          unlocked = unlocked.filter(item => item !== "Pro");
        }  
        if(unlocked.includes('Expert')){
          locked.push("Expert"); 
          unlocked = unlocked.filter(item => item !== "Expert");
        } 
        if(unlocked.includes('Elite')){
          locked.push("Elite"); 
          unlocked = unlocked.filter(item => item !== "Elite");
        } 
      }
      }
    else if(action == 'follow others'){
      if(locked.includes('Lonesome No More')){
        unlocked.push("Lonesome No Moreo"); 
        locked = locked.filter(item => item !== "Lonesome No More");
      }

    }
    
  }

  getAcheivementsPics(unlocked: string[]) { 

    var Achievements: achievementBadge[] = [];
    var HigherLevelChosen: boolean = false;

    for(let item of unlocked){
      if(item == 'Task Hero'){ 
        Achievements.push({title: item, path: '/assets/icons/firsttask.png', type: 'trophy'})
      }
      if(item == 'First Blood'){ 
        Achievements.push({title: item, path: '/assets/icons/firstblood.png', type: 'trophy'})
      }
      if(item == 'Lonesome No More'){ 
        Achievements.push({title: item, path: '/assets/icons/lonesome.png', type: 'trophy'})
      }
      if(item == 'Pro'){ 
        Achievements.push({title: item, path: '/assets/icons/pro.png', type: 'Level'})
      }
      if(item == 'Novice'){ 
        Achievements.push({title: item, path: '/assets/icons/novice.png', type: 'Level'})
      }
      if(item == 'Expert'){ 
        Achievements.push({title: item, path: '/assets/icons/expert.png', type: 'Level'})
      }
      if(item == 'Elite'){ 
        Achievements.push({title: item, path: '/assets/icons/elite.png', type: 'Level'})
      }
    }
  }

}