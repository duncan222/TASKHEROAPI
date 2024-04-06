import { Injectable } from '@angular/core';
import { achievementBadge } from '../interfaces/achievementBadge.interface';
import { IUserAchievements } from '../interfaces/userachievements.interface';

@Injectable({
  providedIn: 'root',
})

//this is a service for getting the achievements, basically just a ton of if statements to fetch images and titles 
// UPDATE UserAchievements
// SET UnlockedAchievements = '["Novice"]', LockedAchievements = '["Pro", "Expert", "Elite", "First Blood", "Lonesome No More", "Task Hero"]'
// WHERE UserId = 20;

export class Achievements {
  updateAchievements(userId: number, updateData: IUserAchievements) {
      throw new Error('Method not implemented.');
  }

  determineAcheivements(unlocked: string[], locked: string[], streak: number, action: string, tasks_complete: number): [string[], string[], string[]] { 
    var new_stuff: string[] = [];

    if(action == 'add task'){
      if(locked.includes('Task Hero')){
        new_stuff.push("Task Hero"); 
        unlocked.push("Task Hero"); 
        locked = locked.filter(item => item !== "Task Hero");
      }
    }
    else if(action == 'complete task'){
      if(locked.includes('First Blood')){
        new_stuff.push("First Blood"); 
        unlocked.push("First Blood"); 
        locked = locked.filter(item => item !== "First Blood");
      }
      if(streak >= 100){
        if(locked.includes('Task Master')){
          new_stuff.push("Task Master"); 
          unlocked.push("Task Master"); 
          locked = locked.filter(item => item !== "Task Master");
        }
      }
      if(streak < 100){
        if(unlocked.includes('Task Master')){
          locked.push("Task Master"); 
          unlocked = unlocked.filter(item => item !== "Task Master");
        }
      }
      if(tasks_complete >= 50 && tasks_complete < 100){
        if(locked.includes('Pro')){
          unlocked.push("Pro"); 
          locked = locked.filter(item => item !== "Pro");
          unlocked = unlocked.filter(item => item !== "Novice");
        }  
      }
      if(tasks_complete >= 100 && tasks_complete < 150){
        if(locked.includes('Expert')){
          unlocked.push("Expert"); 
          locked = locked.filter(item => item !== "Expert");
          unlocked = unlocked.filter(item => item !== "Pro");
        }  
      }
      if(tasks_complete >= 100){
        if(locked.includes('100 Tasks Completed')){
          new_stuff.push("100 Tasks Completed"); 
          unlocked.push("100 Tasks Completed"); 
          locked = locked.filter(item => item !== "100 Tasks Completed");
        }  
      }
      if(tasks_complete >= 200){
        if(locked.includes('200 Tasks Completed')){
          new_stuff.push("200 Tasks Completed"); 
          unlocked.push("200 Tasks Completed"); 
          locked = locked.filter(item => item !== "200 Tasks Completed");
        }  
      }
      if(tasks_complete >= 300){
        if(locked.includes('Justice Prevails')){
          new_stuff.push("Justice Prevails"); 
          unlocked.push("Justice Prevails"); 
          locked = locked.filter(item => item !== "Justice Prevails");
        }  
      }
      if(tasks_complete >= 150){
        if(locked.includes('Elite')){
          unlocked.push("Elite"); 
          locked = locked.filter(item => item !== "Elite");
          unlocked = unlocked.filter(item => item !== "Expert");
        }  
      }
    }
    else if(action == 'follow others'){
      if(locked.includes('Lonesome No More')){
        new_stuff.push("Lonesome No More"); 
        unlocked.push("Lonesome No More"); 
        locked = locked.filter(item => item !== "Lonesome No More");
      }
    }
    
    return [unlocked, locked, new_stuff];
  }

  getAcheivementsPics(unlocked: string[]): achievementBadge[] { 

    var Achievements: achievementBadge[] = [];
    var HigherLevelChosen: boolean = false;

    for(let item of unlocked){
      if(item == '100 Tasks Completed'){ 
        Achievements.push({title: item, path: '/assets/icons/100.png', type: 'trophy'})
      }
      if(item == '200 Tasks Completed'){ 
        Achievements.push({title: item, path: '/assets/icons/200.png', type: 'trophy'})
      }
      if(item == 'Justice Prevails'){ 
        Achievements.push({title: '300 Tasks Completed', path: '/assets/icons/300.png', type: 'trophy'})
      }
      if(item == 'Task Master'){ 
        Achievements.push({title: item, path: '/assets/icons/taskmaster.png', type: 'trophy'})
      }
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
        Achievements.push({title: item, path: '/assets/icons/Expert.png', type: 'Level'})
      }
      if(item == 'Elite'){ 
        Achievements.push({title: item, path: '/assets/icons/elite.png', type: 'Level'})
      }
    }
    return Achievements; 
  }

}