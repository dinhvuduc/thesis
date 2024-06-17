import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { catchError, map, of } from 'rxjs';

export const noAuthGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.me().pipe(
    map((user) => (Boolean(user) ? router.createUrlTree(['/']) : true)),
    catchError(() => of(true))
  );
};
