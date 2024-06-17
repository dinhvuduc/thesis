import { Component } from '@angular/core';
import { MenuService } from '../../services/menu.service';
import { NgComponentOutlet } from '@angular/common';

@Component({
  templateUrl: './menu.component.html',
  standalone: true,
  selector: 'app-menu',
  imports: [NgComponentOutlet],
})
export class MenuComponent {
  constructor(private readonly menuService: MenuService) {}

  ngOnInit(): void {
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (target !== null) {
        if ((target as HTMLElement).id === 'menu-overlay')
          this.menuService.close();
      }
    });
  }
  get opened() {
    return this.menuService.opened;
  }
  get Component() {
    return this.menuService.componentRef;
  }

  get x() {
    return this.menuService.x;
  }

  get y() {
    return this.menuService.y;
  }
}
