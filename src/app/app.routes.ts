import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { noAuthGuard } from './guards/no-auth.guard';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  {
    path: 'sign-in',
    loadComponent: () =>
      import('./Pages/sign-in/sign-in.component').then(
        (c) => c.SignInComponent
      ),
    canActivate: [noAuthGuard],
  },

  {
    path: 'sign-up',
    loadComponent: () =>
      import('./Pages/sign-up/sign-up.component').then(
        (c) => c.SignUpComponent
      ),
    canActivate: [noAuthGuard],
  },

  {
    path: '',
    loadComponent: () =>
      import('./Pages/landing/landing.component').then(
        (c) => c.LandingPageComponent
      ),
  },

  {
    path: '404',
    loadComponent: () =>
      import('./Pages/not-found/not-found.component').then(
        (c) => c.NotFoundComponent
      ),
  },

  {
    path: 'warm-up',
    loadComponent: () =>
      import('./Pages/warm-up/warm-up.component').then(
        (c) => c.WarmUpComponent
      ),
  },

  {
    path: 'tracking',
    loadComponent: () =>
      import('./Pages/tracking/tracking.component').then(
        (c) => c.TrackingComponent
      ),
    canActivate: [authGuard],
  },

  {
    path: 'coaching',
    loadComponent: () =>
      import('./Pages/coaching/coaching.component').then(
        (c) => c.CoachingComponent
      ),
  },

  {
    path: 'landing',
    loadComponent: () =>
      import('./Pages/landing/landing.component').then(
        (c) => c.LandingPageComponent
      ),
  },

  {
    path: 'progress',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Pages/progress/progress.component').then(
        (c) => c.ProgressPageComponent
      ),
  },

  {
    path: 'reset-password',
    loadComponent: () =>
      import('./Pages/reset-password/reset-password.component').then(
        (c) => c.ResetPasswordPageComponent
      ),
  },

  {
    path: 'profile',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./Pages/profile/profile.component').then(
        (c) => c.ProfilePageComponent
      ),
  },

  {
    path: 'admin',
    loadComponent: () =>
      import('./Pages/admin/admin.component').then((c) => c.AdminPageComponent),
    canActivate: [adminGuard],
    children: [
      {
        path: 'exercise',
        loadComponent: () =>
          import('./Pages/admin/exercises/exercise.component').then(
            (c) => c.ExercisePageComponet
          ),
      },
      {
        path: 'users',
        loadComponent: () =>
          import('./Pages/admin/users/users.component').then(
            (c) => c.UsersPageComponet
          ),
      },
      // {
      //   path: 'coaches',
      //   loadComponent: () =>
      //     import('./Pages/admin/exercises/exercise.component').then(
      //       (c) => c.ExercisePageComponet
      //     ),
      // },
    ],
  },

  {
    path: '**',
    redirectTo: '404',
  },
];
