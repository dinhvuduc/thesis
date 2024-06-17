import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user) =>
      Boolean(user) ? true : router.createUrlTree(['/', 'sign-in'])
    ),
    catchError(() => of(router.createUrlTree(['/', 'sign-in'])))
  );
};
