import { HttpClient } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';
import { User } from '../types/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  login(email: string, password: string) {
    return this.http
      .post<{ token: string }>('http://localhost:3000/auth', {
        email,
        password,
      })
      .pipe(
        tap(({ token }) => {
          localStorage.setItem('token', token);

          this.router.navigate(['/', 'tracking']);
        })
      );
  }

  me() {
    const token = localStorage.getItem('token');

    return this.http
      .get<User>('http://localhost:3000/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(tap((user) => this.user$.next(user)));
  }

  signup(body: Record<string, string>) {
    return this.http.post('http://localhost:3000/auth/signup', body);
  }

  signout() {
    localStorage.removeItem('token');
    this.user$.next(undefined);
  }

  updateProfile(value: any) {
    const token = localStorage.getItem('token');

    return this.http
      .post('http://localhost:3000/auth/update-profile', value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .pipe(switchMap(() => this.me()));
  }

  resetPassword(email: string, password: string) {
    return this.http.post('http://localhost:3000/auth/reset-password', {
      email,
      password,
    });
  }
}
