import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userDataStore = new BehaviorSubject<User>({} as User);
  public $userData = this.userDataStore.asObservable();

  constructor(
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth,
    public router: Router,
  ) { 
    this.onAuthChange();
  }

  onAuthChange() {
    this.afAuth.authState.subscribe((user: any) => {
      if (user) {
        console.log('Logged in as ' + user);
        this.updateUserData(user);
        localStorage.setItem('user', JSON.stringify(user));
        JSON.parse(localStorage.getItem('user')!);
      } else {
        localStorage.setItem('user', 'null');
        JSON.parse(localStorage.getItem('user')!);
      }
    });
  }

  updateUserData(user: User) {
    this.userDataStore.next(user);
  }

  getUserUid() {
    return this.userDataStore.value.uid;
  }

  getUserObject() {
    return this.userDataStore.value;
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

    // Sign in with email/password
   async signIn(email: string, password: string) {
    try {
       const result = await this.afAuth
         .signInWithEmailAndPassword(email, password);
       this.setUserData(result.user);
       this.afAuth.authState.subscribe((user_1: any) => {
         if (user_1) {
           this.router.navigate(['profile']);
         }
       });
     } catch (error) {
       window.alert(error);
     }
  }

   async setUserData(user: any) {
      const userRef: AngularFirestoreDocument<any> = this.afs.doc(
        `users/${user.uid}`
      );
      const userData: User = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      try {
       return await userRef.set(userData, {
         merge: true,
       });
     } catch (error) {
       console.log(error);
     }
    }

  updateUserProfile(username: string, photoUrl: string) {
    this.afAuth.currentUser.then(user => {
      user?.updateProfile({
        displayName: username,
        photoURL: photoUrl,
      })
    }).catch(error => { 
      console.log(error);
    })
  }

  async signUp(email: string, password: string, username: string) {
    try {
      const result = await this.afAuth
        .createUserWithEmailAndPassword(email, password);
      this.sendVerificationMail();
      if (result.user) {
        result.user.displayName = username;
        this.setUserData(result.user);
      }
    } catch (error) {
      window.alert(error);
    }
  }
  // Send email verfificaiton when new user sign up
  async sendVerificationMail() {
    return this.afAuth.currentUser
      .then((u: any) => u.sendEmailVerification())
      .then(() => {
        this.router.navigate(['verify-email-address']);
      });
  }
  // Reset Forggot password
  async forgotPassword(passwordResetEmail: string) {
    try {
      await this.afAuth
        .sendPasswordResetEmail(passwordResetEmail);
      window.alert('Password reset email sent, check your inbox.');
    } catch (error) {
      window.alert(error);
    }
  }

  async signOut() {
    return this.afAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
