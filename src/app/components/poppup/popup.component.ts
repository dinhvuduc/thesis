import { Component, OnInit } from '@angular/core';
import { PopupService } from '../../services/popup.service';
import { NgComponentOutlet, NgStyle } from '@angular/common';

@Component({
  templateUrl: './popup.component.html',
  standalone: true,
  selector: 'app-popup',
  imports: [NgComponentOutlet, NgStyle],
})
export class PopupComponent implements OnInit {
  constructor(private readonly popupService: PopupService) {}

  ngOnInit(): void {
    document.body.addEventListener('click', (event) => {
      const target = event.target;
      if (target !== null) {
        if ((target as HTMLElement).id === 'popup-overlay')this.popupService.closePopup();
      }
    });
  }
  get opened() {
    return this.popupService.opened;
  }
  onClosePopup() {
    this.popupService.closePopup();
  }
  get Component() {
    return this.popupService.componentRef;
  }

  get width() {
    return this.popupService.width;
  }
}
