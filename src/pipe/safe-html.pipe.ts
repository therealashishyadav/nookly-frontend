import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({ name: 'safeHtml' })
export class SafeHtmlPipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string | null): SafeHtml | null {
    if (!value) return null;
    // Prefer interpolation; this pipe should be used sparingly and only when HTML is trusted
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }
}
