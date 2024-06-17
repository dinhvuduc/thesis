import { ChangeDetectionStrategy, Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { catchError, switchMap, tap } from 'rxjs';
import { ProfileFormComponent } from '../../components/profile-form/profile-form.component';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [
    InputComponent,
    RouterLink,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    ProfileFormComponent,
  ],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  errorMessage = '';

  submit$ = (value: any) =>
    this.authService.signup(value).pipe(
      switchMap(() => {
        return this.authService.login(value.email, value.password);
      }),
      tap(() => window.location.reload()),
      catchError((error) => {
        this.errorMessage = error.error.message;

        return error;
      })
    );

  constructor(private readonly authService: AuthService) {}
}
