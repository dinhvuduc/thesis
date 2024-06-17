import { Component } from '@angular/core';
import { ButtonComponent } from '../../../components/button/button.component';
import { RouterLink } from '@angular/router';
import { PopupService } from '../../../services/popup.service';

@Component({
  templateUrl: './congrat.component.html',
  standalone: true,
  imports: [ButtonComponent, RouterLink,],
})
export class CongratComponent {
  constructor(private readonly popup: PopupService) {}

  onClose() {
    this.popup.closePopup();
  }
}
