import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // RXJS
  closing$ = new Subject<void>();

  opened = false;
  componentRef: any;
  data: any;
  x = 0;
  y = 0;

  close() {
    this.data = undefined;
    this.opened = false;
    this.componentRef = undefined;

    document.body.style.overflow = 'auto';
  }

  open(componentRef: any, x: number, y: number) {
    this.componentRef = componentRef;
    this.opened = true;

    this.x = x;
    this.y = y;

    document.body.style.overflow = 'hidden';
  }
}
