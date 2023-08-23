import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core';
import { Router } from '@angular/router';


export const dashboardGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    return true;
  } else {
    inject(Router).navigate(['login']);
    return false;
  }
};
