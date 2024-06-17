import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { AuthService } from '../../../services/auth.service';
import { MenuService } from '../../../services/menu.service';
import { RouterLink } from '@angular/router';

@Component({
  templateUrl: './user-menu.component.html',
  standalone: true,
  imports: [ButtonComponent, RouterLink],
})
export class UserMenuComponent {
  constructor(
    private readonly authService: AuthService,
    private readonly menu: MenuService
  ) {}

  signout() {
    this.authService.signout();
    this.menu.close();

    window.location.reload();
  }
}
