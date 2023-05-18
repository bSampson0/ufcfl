import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  isDisabled = false;
  form = new FormGroup({
     email: new FormControl(),
    password: new FormControl(),
  });
 
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { 
    
  }

}
