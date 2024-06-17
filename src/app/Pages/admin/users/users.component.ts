import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { PopupService } from '../../../services/popup.service';
import { ButtonComponent } from '../../../components/button/button.component';
import { User } from '../../../types/user';
import { UserService } from '../../../services/user.service';

@Component({
  templateUrl: './users.component.html',
  standalone: true,
  imports: [NgFor, ButtonComponent],
})
export class UsersPageComponet implements OnInit {
  users: User[] = [];
  constructor(
    private readonly userService: UserService,
    private readonly popupService: PopupService
  ) {}

  ngOnInit(): void {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
