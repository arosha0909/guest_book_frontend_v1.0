import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Role } from 'src/app/common/role';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from './../../common/util';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  user: User;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.authService.getUser().subscribe(user => {
      this.user = user;
    });
  }

  goToHome(){
    Util.gotoHome();
  }

  logOut() {
    this.authService.logout();
    this.goToHome();
  }

}
