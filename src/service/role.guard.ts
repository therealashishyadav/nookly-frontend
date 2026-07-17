import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const roles: string[] = route.data?.['roles'] || [];
    if (!roles || roles.length === 0) return true;
    for (const r of roles) {
      if (this.auth.hasRole(r)) return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}
