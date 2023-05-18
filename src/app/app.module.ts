import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { FightersModule } from './fighters/fighters.module';
import { environment } from 'src/environments/environment';
import { ReactiveFormsModule } from '@angular/forms';
import { TeamsModule } from './teams/teams.module';
import { ProfileComponent } from './core/profile/profile.component';
import { MaterialModule } from './material/material.module';
import { EditProfileDialogComponent } from './core/edit-profile-dialog/edit-profile-dialog.component';
import { SignInComponent } from './core/sign-in/sign-in.component';
import { CreateAccountComponent } from './core/create-account/create-account.component';

@NgModule({
  declarations: [
    AppComponent,
    ProfileComponent,
    EditProfileDialogComponent,
    SignInComponent,
    CreateAccountComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    MaterialModule,
    FightersModule,
    TeamsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
