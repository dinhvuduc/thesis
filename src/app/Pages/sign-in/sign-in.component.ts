
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { InputComponent } from '../../components/input/input.component';
import { ButtonComponent } from '../../components/button/button.component';


@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
  
    RouterLink,
    InputComponent,
    ButtonComponent
    
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
 
})
export class SignInComponent { }
