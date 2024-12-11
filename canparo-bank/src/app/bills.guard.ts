import { inject } from "@angular/core";
import { Router, CanActivateFn } from "@angular/router";
import { userService } from "./services/user.service";
import { BillService } from "./services/bill.service";
export const BillGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const authService = inject(userService);
  const billService=inject(BillService)
  const isLoggedIn = authService.isLoggedIn()
  if (isLoggedIn) {
    const hasBills = await billService.checkUserBills().toPromise();
    if (hasBills?.hasBills.length===0) {
      // Redirect to create-bill page if the user has no bills
      router.navigate(['card/createUserBill']);
      return false;
    }
  }

  return true; // Allow access otherwise
};