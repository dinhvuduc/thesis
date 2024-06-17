import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LayoutComponent } from './components/layout/layout.component';
import { PopupComponent } from './components/poppup/popup.component';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './components/menu/menu.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    LayoutComponent,
    PopupComponent,
    MenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  constructor(private readonly authService: AuthService) {}
  title = 'Thesis';
  ngOnInit(): void {
    this.authService.me().subscribe({
      error: () => {},
    });
  }
}
