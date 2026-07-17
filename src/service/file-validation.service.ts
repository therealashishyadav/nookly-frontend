import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class FileValidationService {
  private imageTypes = ['image/jpeg', 'image/png', 'image/webp'];
  private videoTypes = ['video/mp4', 'video/quicktime'];
  private maxImageSize = 5 * 1024 * 1024; // 5 MB
  private maxVideoSize = 50 * 1024 * 1024; // 50 MB

  validateFile(file: File, resourceType: 'image' | 'video' = 'image'): { ok: boolean; message?: string; file?: File } {
    if (!file) return { ok: false, message: 'No file provided' };

    const type = file.type;
    const size = file.size;

    if (resourceType === 'image') {
      if (!this.imageTypes.includes(type)) {
        return { ok: false, message: 'Only JPEG, PNG, and WEBP images are allowed.' };
      }
      if (size > this.maxImageSize) {
        return { ok: false, message: 'Image must be smaller than 5 MB.' };
      }
    } else {
      if (!this.videoTypes.includes(type)) {
        return { ok: false, message: 'Only MP4 and MOV videos are allowed.' };
      }
      if (size > this.maxVideoSize) {
        return { ok: false, message: 'Video must be smaller than 50 MB.' };
      }
    }

    // sanitize filename
    const sanitized = this.sanitizeFileName(file.name);
    const safeFile = new File([file], sanitized, { type: file.type });

    return { ok: true, file: safeFile };
  }

  sanitizeFileName(name: string): string {
    // Remove path characters and limit to safe chars
    const base = name.replace(/.*[\\/]/, '');
    return base.replace(/[^a-zA-Z0-9._-]/g, '_').slice(0, 200);
  }
}
