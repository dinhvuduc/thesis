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
  path: 'warm-up',
  loadComponent: () => import('./Pages/warm-up/warm-up.component').then( (c) =>c.WarmUpComponent),
 },
 
 { 
  path: 'tracking',
  loadComponent: () => import('./Pages/tracking/tracking.component').then( (c) =>c.TrackingComponent),
 },
 
 { 
  path: 'coaching',
  loadComponent: () => import('./Pages/coaching/coaching.component').then( (c) =>c.CoachingComponent),
 },

 { 
  path: 'landing',
  loadComponent: () => import('./Pages/landing/landing.component').then( (c) =>c.LandingPageComponent),
 },

 
 {
  path: '**',
  redirectTo:'404'
 },


];
