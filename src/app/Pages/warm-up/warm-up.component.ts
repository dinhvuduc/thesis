

import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-warm-up',
  standalone: true,
  imports: [
   RouterLink,StepComponent,ButtonComponent
  ],
  templateUrl: './warm-up.component.html',
  styleUrl: './warm-up.component.scss',
  
})
export class WarmUpComponent { }
