import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Admin } from '../models/admin';
import { Guest } from '../models/guest';
import { User } from '../models/user';

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

  private static setToken(token, isRemember): void {
      if (isRemember) {
          localStorage.setItem('token', token);
      } else {
          sessionStorage.setItem('token', token);
      }
  }


  public logout(): void {
    this.invalidate();
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  public invalidate(): void {
    this.user = null;
  }

}
