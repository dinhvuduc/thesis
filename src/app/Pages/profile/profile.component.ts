import { Component, OnInit } from '@angular/core';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { NgIf } from '@angular/common';
import { switchMap, tap, catchError } from 'rxjs';
import { UserBoxComponent } from '../../components/user-box/user-box.component';

@Component({
  templateUrl: './profile.component.html',
  standalone: true,
  imports: [ProfileFormComponent, NgIf, UserBoxComponent],
})
export class ProfilePageComponent implements OnInit {
  user: User | undefined;
  error = '';
  status = '';

  submit$ = (value: any) =>
    this.authService.updateProfile(value).pipe(
      tap(() => (this.status = 'Succesfully updated profile!')),
      catchError((error) => {
        this.error = error.error.message;

        return error;
      })
    );

  constructor(private readonly authService: AuthService) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
