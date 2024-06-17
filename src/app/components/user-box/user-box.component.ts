import { Component, OnInit } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixAccountCircleFill, remixEdit2Fill } from '@ng-icons/remixicon';
import { AuthService } from '../../services/auth.service';
import { User } from '../../types/user';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './user-box.component.html',
  standalone: true,
  selector: 'app-user-box',
  imports: [NgIconComponent, NgIf, RouterLink],
  viewProviders: [provideIcons({ remixAccountCircleFill, remixEdit2Fill })],
})
export class UserBoxComponent implements OnInit {
  user: User | undefined;

  constructor(private readonly authService: AuthService) {}

  ngOnInit() {
    this.authService.user$.subscribe((user) => {
      this.user = user;
    });
  }
}
