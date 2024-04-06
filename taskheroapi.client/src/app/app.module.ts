import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SignupComponent } from './signup/signup.component';
import { SocialComponent } from './social/social.component';
import { ProfileComponent } from './profile/profile.component';
import { TasksComponent } from './tasks/tasks.component';
import { AchievementsComponent } from './achievements/achievements.component';
import { SettingsComponent } from './settings/settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { AddTaskComponent } from './add-task/add-task.component';
import { NotificationComponent } from './notification/notification.component';
import { LoadingComponent } from './loading/loading.component';
import { ImagePopComponent } from './image-pop/image-pop.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatNativeDateModule } from '@angular/material/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ScoreNotificationComponent } from './score-notification/score-notification.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    SignupComponent,
    SocialComponent,
    ProfileComponent,
    TasksComponent,
    AchievementsComponent,
    SettingsComponent,
    EditProfileComponent,
    EditAvatarComponent,
    UserProfileComponent,
    LoadingComponent,
    AddTaskComponent,
    NotificationComponent,
    ImagePopComponent,
    ConfirmDialogComponent,
    ScoreNotificationComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatDialogModule,
    MatCardModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatIconModule,
    MatRadioModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatProgressBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
