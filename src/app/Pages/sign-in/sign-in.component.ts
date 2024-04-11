import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    RouterLink,
    InputComponent,
    ButtonComponent,
    ReactiveFormsModule,
    FormsModule,
    NgIf,
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent implements OnInit {
  form: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly authService: AuthService
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f(){
    return this.form.controls;
  }

  ngOnInit(): void {
    // this.form..get('email')?.valid = true
    // this.form..get('email')?.invalid =false
  }
  onSubmit() {
    this.authService
      .login(this.form.value.email, this.form.value.password)
      .subscribe({
        next: () => {
          window.location.reload()  
        },
        error: (error) => {
          // bắt lỗi user not found
          // user enter wrong password
          console.log(error);
        },
      });
  }
}
