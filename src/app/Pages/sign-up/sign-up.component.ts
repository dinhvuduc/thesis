
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputComponent,
  RouterLink,
ButtonComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignUpComponent { }
