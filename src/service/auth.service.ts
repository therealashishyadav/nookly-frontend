import { Injectable } from '@angular/core';
import { Account } from '../entity/Account';

@Injectable({ providedIn: 'root' })
export class AuthService {
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  decodeToken(): any | null {
    const token = this.getToken();
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch {
      return null;
    }
  }

  getCurrentUser(): Account | null {
    const payload = this.decodeToken();
    if (!payload) return null;
    const acc = new Account();
    acc.firstName = payload.firstName || '';
    acc.lastName = payload.lastName || '';
    acc.email = payload.sub || '';
    acc.phone = payload.phone || '';
    acc.role = payload.role || 'USER';
    acc.active = payload.active ?? true;
    return acc;
  }

  hasRole(role: string): boolean {
    const cur = this.getCurrentUser();
    if (!cur || !cur.role) return false;
    return cur.role === role;
  }
}
// auth.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface AppUser {
  name: string;
  email: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private userSubject = new BehaviorSubject<AppUser | null>(null);
  user$: Observable<AppUser | null> = this.userSubject.asObservable();

  login(user: AppUser): void {
    this.userSubject.next(user);
  }

  logout(): void {
    this.userSubject.next(null);
  }
}