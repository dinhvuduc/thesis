import { Component } from '@angular/core';
import { ButtonComponent } from '../../button/button.component';
import { TrackingService } from '../../../services/tracking.service';
import { MenuService } from '../../../services/menu.service';
import { NgFor } from '@angular/common';

@Component({
  templateUrl: './menu.component.html',
  standalone: true,
  imports: [ButtonComponent, NgFor],
})
export class ExerciseMenuComponent {
  error = '';
  loading = false;

  constructor(
    private readonly trackingService: TrackingService,
    private readonly menu: MenuService
  ) {}

  onDelete() {
    this.loading = true;

    
  }

  get options() {
    return this.menu.data.options;
  }
}
