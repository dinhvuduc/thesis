
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [NgClass
  ],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() type: string='button';
  @Input() btnClass: string='';
  @Input() btnType: 'black' | 'transparent' = 'transparent'
  @Input() disabled = false;
 }
