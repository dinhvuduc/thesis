import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgIconComponent, provideIcons } from '@ng-icons/core';
import { remixArrowDownSFill, remixArrowUpSFill } from '@ng-icons/remixicon';

@Component({
  templateUrl: './expansion.component.html',
  standalone: true,
  selector: 'app-expansion',
  imports: [NgIconComponent, NgClass],
  viewProviders: [provideIcons({ remixArrowDownSFill, remixArrowUpSFill })],
})
export class ExpansionComponet {
  @Input() label: string = '';
  @Input() opened = false;
}
