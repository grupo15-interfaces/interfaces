import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (!authService.isLoggedIn()) {
    router.navigate(['/login']);
    return false;
  }

  const requiredRoles = route.data['roles'] as string[];
  if (requiredRoles && !requiredRoles.includes(authService.currentUser()!.role)) {
      // Si el rol no es el requerido, redirigir al dashboard
      router.navigate(['/app/dashboard']);
      return false;
  }

  return true;
};