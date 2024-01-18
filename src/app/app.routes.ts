import { Routes } from '@angular/router';

export const routes: Routes = [
 { 
  path: 'sign-in',
  loadComponent: () => import('./Pages/sign-in/sign-in.component').then( (c) =>c.SignInComponent),
 },

 { 
  path: 'sign-up',
  loadComponent: () => import('./Pages/sign-up/sign-up.component').then( (c) =>c.SignUpComponent),
 },

 {
  path: '',
  loadComponent: () => import('./Pages/landing/landing.component').then( (c) =>c.LandingPageComponent),
 },

 {
  path: '404',
  loadComponent: () => import('./Pages/not-found/not-found.component').then( (c) =>c.NotFoundComponent),
 },

 {
  path: '**',
  redirectTo:'404'
 },


];
