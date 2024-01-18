import { Component } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    StepComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {

}
