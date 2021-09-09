import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Util } from '../common/util';
import { Admin } from '../models/admin';
import { Guest } from '../models/guest';
import { User } from '../models/user';
import {Response} from '../models/response';

export type RegisterData = Partial<User> & Pick<User, 'role'> & { password: string };
export type AnyUser = Guest | Admin;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User;
  public onUserUpdate: EventEmitter<User> = new EventEmitter<User>();

  constructor(
    private httpClient: HttpClient
  ) { }

  static getToken(): any {
    return localStorage.getItem('token') || sessionStorage.getItem('token');
  }

  public static setToken(token): void {
          localStorage.setItem('token', token);
  }

  public logout(): void {
    this.invalidate();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  public invalidate(): void {
    this.user = null;
  }

  getUser(): Observable<AnyUser> {

    if (this.user) {
        return of(this.user);
    }

    const token = AuthService.getToken();

    if (!token) {
        return of(null);
    }

    const ep = Util.apiAuthUrl('self');

    return this.httpClient.get<Response<User>>(ep).pipe(
        map(res => res.data),
        tap((user: User) => {
            if (!user) {
                this.logout();
            }
            this.user = user;
            this.onUserUpdate.emit(user);
        }),
    );
}

// not important for guest book
ById(id: string): any {
  const ep = Util.apiPublicUrl('other-user/' + id);
  return this.httpClient.get<Response<User>>(ep).pipe(
      map(res => res.data));
}

 // for Admin
getAllUsers(): any {
  const ep = Util.apiAuthUrl('get-all-guest');
  return this.httpClient.get<Response<User>>(ep).pipe(
      map(res => res.data)
  );
}

// all user log with bellow service
login(email: string, password: string): Observable<Response<string>> {
  const url = Util.apiPublicUrl('login');
  return this.httpClient.post<Response<string>>(url, {email, password}).pipe(map(res => {
      if (res.data) {
          AuthService.setToken(res.data);
      }
      return res;
  }), catchError((err, caught) => {
      console.log(err);
      return of({success: false, message: err.toString(), data: null});
  }));
}

register(userData: RegisterData): Observable<Response<string>> {
  const url = Util.apiPublicUrl('register');
  return this.httpClient.post<Response<string>>(url, userData).pipe(map(res => {
      if (res.data) {
          AuthService.setToken(res.data);
      }
      return res;
  }), catchError((err, caught) => {
      console.log(err);
      return of({success: false, message: err.toString(), data: null});
  }));
}

isEmailExists(email: string): Observable<boolean> {
  const url = Util.apiPublicUrl('email-exists');
  return this.httpClient.post<Response<boolean>>(url, {email}).pipe(map(res => res.data));
}

}
