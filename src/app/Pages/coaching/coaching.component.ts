import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-coaching',
  standalone: true,
  imports: [
    CommonModule,StepComponent, ButtonComponent,
  ],
  templateUrl: './coaching.component.html',
  styleUrl: './coaching.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoachingComponent { }
