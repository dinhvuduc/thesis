import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixAccountCircleFill } from '@ng-icons/remixicon';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';
import { MenuService } from '../../services/menu.service';
import { User } from '../../types/user';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent, RouterLink, NgIf],
  viewProviders: [provideIcons({ remixAccountCircleFill })],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @ViewChild('buttonEle') buttonEle: ElementRef<HTMLButtonElement> | undefined;

  user: User | undefined;

  constructor(
    private readonly authService: AuthService,
    private readonly menuService: MenuService,
    private readonly cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.authService.user$.asObservable().subscribe((user) => {
      this.user = user;
      this.cdr.markForCheck();
    });
  }

  async onOpenMenu() {
    const Component = await import('./user-menu/user-menu.component').then(
      (c) => c.UserMenuComponent
    );

    if (!this.buttonEle) return;

    const { x, y } = this.buttonEle.nativeElement.getBoundingClientRect();

    this.menuService.open(Component, x - 180, y + 50);
  }

  get isAdmin() {
    return this.user?.admin;
  }
}
