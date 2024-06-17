import { Component } from '@angular/core';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './reset-password.component.html',
  standalone: true,
  imports: [
    InputComponent,
    ButtonComponent,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
  ],
})
export class ResetPasswordPageComponent {
  form: FormGroup;
  error = '';

  hasSubittedEmail = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  onSubmit() {
    if (!this.hasSubittedEmail) {
      this.hasSubittedEmail = true;
      return;
    }

    this.authService
      .resetPassword(this.form.value.email, this.form.value.password)
      .subscribe({
        next: () => {
          this.router.navigate(['/sign-in']);
        },
        error: (error) => {
          this.error = error.error?.message ?? error.message;
        },
      });
  }
}
