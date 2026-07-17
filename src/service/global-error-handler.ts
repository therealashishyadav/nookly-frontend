import { ErrorHandler, Injectable, Injector } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) {}

  handleError(error: any): void {
    // Avoid throwing while handling
    try {
      const snack = this.injector.get(MatSnackBar);
      // Show generic message to user
      snack.open('Something went wrong. Please try again.', 'Close', { duration: 4000 });
    } catch {
      // ignore
    }
    // Log full error to console for devs only
    if (typeof console !== 'undefined') {
      console.error('GlobalErrorHandler:', error);
    }
  }
}
