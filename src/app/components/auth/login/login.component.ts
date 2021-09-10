import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Role } from 'src/app/common/role';
import { AuthService } from 'src/app/services/auth.service';
import { User } from './../../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: User;
  errorLogin: any;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  static navigateUser(user, router): void {
    switch (user.role) {
      case Role.ADMIN:
        router.navigateByUrl('/admin/panel');
        break;
      case Role.SUPER_ADMIN:
        router.navigateByUrl('/admin/panel');
        break;
      case Role.GUEST:
        router.navigateByUrl('/profile');
        break;
    }
  }

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.authService.getUser().subscribe(user => {
      this.user = user;
      if (this.user) {
        this.redirectUser(this.user);
      }
    });
  }

  redirectUser(user): void {
    LoginComponent.navigateUser(user, this.router);
  }

  userLogin() {
      this.authService.login(this.loginForm.get('email').value, this.loginForm.get('password').value).subscribe(res => {
        if (res.success) {
          this.authService.getUser().subscribe(user => this.redirectUser(user));
        } else {
          this.errorLogin = res;
        }
      });
  }

}
