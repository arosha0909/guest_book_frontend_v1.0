import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { Util } from '../util';

@Component({
  selector: 'app-token-access',
  templateUrl: './token-access.component.html',
  styleUrls: ['./token-access.component.css']
})
export class TokenAccessComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    const existingToken = AuthService.getToken();
    if (!existingToken) {
      const token = this.route.snapshot.paramMap.get('token');
      AuthService.setToken(token);
    }

    this.authService.getUser().subscribe(res => {
      if (!res) {
        Util.gotoHome();
      }
      const currentUrl = this.router.url;
      const index1 = currentUrl.indexOf('/');
      const slice1 = currentUrl.slice(index1 + 1);
      const index2 = slice1.indexOf('/');
      const slice2 = slice1.slice(index2 + 1);
      const index3 = slice2.indexOf('/');
      const fixedUrl = slice2.slice(index3);

      // noinspection JSIgnoredPromiseFromCall
      this.router.navigateByUrl(fixedUrl);
    });
  }

}
