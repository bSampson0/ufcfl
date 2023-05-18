import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  constructor(public auth: AuthService, public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  editProfile() {
    const userData = this.auth.getUserObject();
    this.dialog.open(EditProfileDialogComponent, {
      data: {
        username: userData.displayName,
        photoURL: userData.photoURL,
      }
    }) 
  }
}
