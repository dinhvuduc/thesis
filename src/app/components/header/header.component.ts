import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import {remixAccountCircleFill } from '@ng-icons/remixicon';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIconComponent,RouterLink],
  viewProviders:[provideIcons({remixAccountCircleFill})],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {

}
