import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanDeactivate } from '@angular/router';
import { AuthenticationService } from './authentication.service';
import { Injectable } from '@angular/core';
import { StorageKey } from '@app/shared/models/storage-key/storage-key';
import { DialogService } from '@app/shared/services/client/dialog.service';
import { SnackbarData, DialogData } from '@app/shared/models/material/material.model';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationGuard implements CanActivate {
  constructor(private router: Router, private auth: AuthenticationService) {}
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!this.auth.isAuthenticated()) {
      // fail authen
      localStorage.removeItem(StorageKey.Token);
      localStorage.removeItem(StorageKey.User);
      this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }, replaceUrl: true });
      return false;
    }
    return true;
  }
}

