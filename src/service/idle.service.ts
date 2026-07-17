import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class IdleService {
  private timeoutMs = 15 * 60 * 1000; // 15 minutes
  private warningMs = 14 * 60 * 1000; // 14 minutes (1 minute before logout)
  private timerId: any = null;
  private warningId: any = null;

  constructor(private router: Router, private ngZone: NgZone) {
    this.startWatching();
  }

  startWatching(): void {
    this.resetTimers();
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(evt => {
      window.addEventListener(evt, this.resetTimersBound, true);
    });
  }

  stopWatching(): void {
    ['mousemove', 'keydown', 'mousedown', 'touchstart'].forEach(evt => {
      window.removeEventListener(evt, this.resetTimersBound, true);
    });
    this.clearTimers();
  }

  private resetTimersBound = () => this.resetTimers();

  private resetTimers(): void {
    this.clearTimers();
    this.ngZone.runOutsideAngular(() => {
      this.warningId = setTimeout(() => {
        // can show a warning dialog here; for now just console
        console.warn('Idle: about to logout due to inactivity');
      }, this.warningMs);

      this.timerId = setTimeout(() => {
        this.ngZone.run(() => this.logout());
      }, this.timeoutMs);
    });
  }

  private clearTimers(): void {
    if (this.warningId) { clearTimeout(this.warningId); this.warningId = null; }
    if (this.timerId) { clearTimeout(this.timerId); this.timerId = null; }
  }

  private logout(): void {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
    } catch (_) {}
    this.router.navigate(['/login']);
  }
}
