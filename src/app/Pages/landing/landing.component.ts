import { Component } from '@angular/core';
import { StepComponent } from '../../components/step/step.component';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [
    StepComponent,
    ButtonComponent
  ],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingPageComponent {

}
