import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { userService } from "./services/user.service";
export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(userService);
  const isLoggedIn = authService.isLoggedIn()
  const isAuthRoute = state.url.includes('/auth/login') || state.url.includes('/auth/register'); // Adjust routes as needed

  if (!isLoggedIn && !isAuthRoute) {
    // If user is not logged in and trying to access a restricted route
    router.navigate(['auth/login']);
    return false;
  }

  if (isLoggedIn && isAuthRoute) {
    // If user is logged in and trying to access login or register
    router.navigate(['/home']);
    return false;
  }

  return true; // Allow access otherwise
};
