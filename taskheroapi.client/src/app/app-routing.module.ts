import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SocialComponent } from './social/social.component';
import { ProfileComponent } from './profile/profile.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { TasksComponent } from './tasks/tasks.component';
import { SettingsComponent } from './settings/settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { AddTaskComponent } from './add-task/add-task.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent},
  {
    path: '',
    component: NavbarComponent,
    children: [
      { path: 'home', component: HomeComponent },
      { path: 'social', component: SocialComponent },
      { path: 'profile', component: ProfileComponent },
      { path: 'achievements', component: AchievementsComponent },
      { path: 'tasks', component: TasksComponent },
      { path: 'settings', component: SettingsComponent}, 
      { path: 'edit', component: EditProfileComponent },
      { path: 'edit-avatar', component: EditAvatarComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
