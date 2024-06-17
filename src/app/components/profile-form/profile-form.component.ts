import { Component, Input, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { Observable, switchMap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { RouterLink } from '@angular/router';
import { ButtonComponent } from '../button/button.component';
import { InputComponent } from '../input/input.component';
import { User } from '../../types/user';
import { NgIf } from '@angular/common';

@Component({
  templateUrl: './profile-form.component.html',
  standalone: true,
  selector: 'app-profile-form',
  imports: [
    InputComponent,
    RouterLink,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  styles: [
    `
      :host {
        display: contents;
      }
    `,
  ],
})
export class ProfileFormComponent implements OnInit {
  form: FormGroup;
  errorMessage = '';

  @Input() user: User | undefined;
  @Input() showLabel = false;
  @Input() submit$: ((value: any) => Observable<any>) | undefined;
  @Input() hasPassword = true;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      confirmPassword: [''],
      age: [undefined, [Validators.required, Validators.min(0)]],
      height: [undefined, [Validators.required, Validators.min(0)]],
      weight: [undefined, [Validators.required, Validators.min(0)]],
    });
  }

  ngOnInit(): void {
    if (this.user) {
      this.form.patchValue({
        ...this.user,
      });
    }

    if (this.hasPassword) {
      this.form.get('password')?.addValidators(Validators.required);
      this.form.get('confirmPassword')?.addValidators(Validators.required);
    }
  }

  onSubmit() {
    if (this.invalid || !this.submit$) return;

    this.errorMessage = '';
    const value = this.form.value;

    value.age = Number(value.age);
    value.weight = Number(value.weight);
    value.height = Number(value.height);

    this.submit$(this.form.value).subscribe();
    // this.authService
    //   .signup(value)
    //   .pipe(
    //     switchMap(() => {
    //       return this.authService.login(value.email, value.password);
    //     })
    //   )
    //   .subscribe({
    //     next: () => {
    //       window.location.reload();
    //     },
    //     error: (error) => {
    //       this.errorMessage = error.error.message;
    //     },
    //   });
  }

  get invalid() {
    return (
      this.form.invalid ||
      this.form.value.password !== this.form.value.confirmPassword
    );
  }
}
