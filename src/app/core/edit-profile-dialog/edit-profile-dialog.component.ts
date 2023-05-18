import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {
  form!: FormGroup;
  constructor(
    public auth: AuthService, 
    private fb: FormBuilder, 
    @Inject(MAT_DIALOG_DATA) public data: {username: string, photoURL: string}
    ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      username: new FormControl(''),
      photoURL: new FormControl(''),
    })
    this.form.setValue({username: this.data.username, photoURL: this.data.photoURL})
    this.form.updateValueAndValidity();
  }

}
