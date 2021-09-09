import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Guest } from 'src/app/models/guest';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../models/user';
import { Role } from 'src/app/common/role';
import { LoginComponent } from '../login/login.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  formData: User & {password: string} & Partial<Guest>;
  hasError = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.formIntegrations();
    this.getUser();
  }

  formIntegrations() {
    this.registrationForm = this.fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      // repassword: ['', [Validators.required, confirmPasswordValidation]]
    });

    this.formData = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      status: true,
      isActive: true,
    };
  }

  async isEmailExists(email: string) {
    return await this.authService.isEmailExists(email).toPromise();
  }

  userRegister() {
    this.formData = {
      firstName: this.registrationForm.get('fname').value,
      lastName: this.registrationForm.get('lname').value,
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
      status: true,
      isActive: true,
      role: Role.GUEST
    };

    if (this.registrationForm.status !== 'INVALID') {
      console.log(this.registrationForm.status);
      this.hasError = false;
      this.authService.register(this.formData).subscribe(res => {
          this.getUser();
      });
    } else {
      this.hasError = true;
    }


  }

  getUser() {
    this.authService.getUser().subscribe(logUser => {
      if (logUser) {
        LoginComponent.navigateUser(logUser, this.router);
      }
    });
  }

}


export const confirmPasswordValidation: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
  if (!control.parent || !control) {
    return null;
  }

  const password = control.parent.get('password');
  const confirmPassword = control.parent.get('repassword');

  if (confirmPassword.value === '') {
    return null;
  }

  if (password.value === confirmPassword) {
    return null;
  }

  return {passwordNotMatching: true};

}