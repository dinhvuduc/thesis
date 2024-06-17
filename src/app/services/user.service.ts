import { HttpClient } from '@angular/common/http';
import { Exercise, Exercise2 } from '../types/exercise';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}
  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:3000/user');
  }
}
