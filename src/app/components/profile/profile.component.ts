import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/common/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { LoginComponent } from '../auth/login/login.component';
import { Guest } from './../../models/guest';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: User;
  showEdit = false;
  userUpdateForm: FormGroup;
  formData: Guest;
  hasError = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formIntegrations();
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  formIntegrations() {
    this.userUpdateForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  editProfile() {
    this.showEdit = true;
  }

  updateUser() {
    this.formData = {
      firstName: this.userUpdateForm.get('fname').value,
      lastName: this.userUpdateForm.get('lname').value,
      email: this.userUpdateForm.get('email').value,
      status: true,
      isActive: true,
      role: Role.GUEST
    };

    if (this.userUpdateForm.status !== 'INVALID') {
      this.authService.updateUser(this.formData).subscribe(res => {
        console.log(res.data);
        if (res.success) {
          this.showEdit = false;
        }
      });
    } else {
      
      console.log('sdsadsd');
      this.hasError = true;
    }

  }


}