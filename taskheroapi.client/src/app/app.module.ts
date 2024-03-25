import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ProgressbarModule} from 'ngx-bootstrap/progressbar';
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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations'
import {MatCardModule} from '@angular/material/card';
import {MatExpansionModule, MatAccordion} from '@angular/material/expansion';
import { UserService } from '../services/user.service';
import { SettingsComponent } from './settings/settings.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { EditAvatarComponent } from './edit-avatar/edit-avatar.component';
import { AddTaskComponent } from './add-task/add-task.component';
import {MatDatepickerModule, MatCalendar, MatCalendarHeader, MatDatepicker} from '@angular/material/datepicker';
import { MatFormField } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio'; 

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
    AddTaskComponent
  ],
  imports: [
    BrowserModule, MatRadioModule, ProgressbarModule, MatCardModule, BrowserAnimationsModule,  HttpClientModule,TooltipModule.forRoot(),
    AppRoutingModule, MatIconModule, FormsModule, ReactiveFormsModule, MatExpansionModule, MatAccordion, MatDatepickerModule, MatFormField, MatDatepicker, MatCalendar, MatNativeDateModule
  ],
  providers: [UserService,
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
