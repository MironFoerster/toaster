import { CanActivateFn } from '@angular/router';
import { AuthService } from '../services/auth.service'
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const loginGuard: CanActivateFn = (route, state) => {
  if (inject(AuthService).isAuthenticated()) {
    console.log(state);
    inject(Router).navigate(['']);
    return false;
  } else {
    return true;
  }
};
