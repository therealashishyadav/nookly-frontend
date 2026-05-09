// src/app/components/list-property/list-property.component.ts

import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PgModel, SharingOptionModel } from '../../entity/PgModel';
import { PgListingService } from '../../service/pg-listing.service';

@Component({
  selector: 'app-list-property',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatCardModule,
    MatExpansionModule,
    MatTooltipModule,
    MatSnackBarModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './list-property.component.html',
  styleUrls: ['./list-property.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class ListPropertyComponent {

  @ViewChild('pgForm') pgForm!: NgForm;

  // ── Main model bound to the form ─────────────────────────────────────────
  pgModel: PgModel = new PgModel();

  // ── UI state ─────────────────────────────────────────────────────────────
  isSubmitting  = false;
  submitSuccess = false;

  // ── File holders ─────────────────────────────────────────────────────────
  coverImageFile: File | null = null;       // actual file selected by owner
  coverImagePreview: string | null = null;  // base64 preview shown in form
  galleryImageFiles: File[] = [];
  videoFile: File | null = null;

  // ── Dropdown options ─────────────────────────────────────────────────────
  occupancyTypes = [
    { value: 'GIRLS', label: 'Girls' },
    { value: 'BOYS',  label: 'Boys'  },
    { value: 'COED',  label: 'Coed'  },
  ];

  bedTypes = [
    { value: 'SINGLE',   label: 'Single Bed' },
    { value: 'DOUBLE',   label: 'Double Bed' },
    { value: 'BUNK',     label: 'Bunk Bed'   },
    { value: 'SOFA_BED', label: 'Sofa Bed'   },
  ];

  housekeepingOptions = [
    { value: 'DAILY',          label: 'Daily'          },
    { value: 'ALTERNATE_DAYS', label: 'Alternate Days' },
    { value: 'WEEKLY',         label: 'Weekly'         },
    { value: 'MONTHLY',        label: 'Monthly'        },
    { value: 'NONE',           label: 'Not Available'  },
  ];

  availabilityOptions = [
    { value: 'STUDENTS',              label: 'Students'              },
    { value: 'WORKING_PROFESSIONALS', label: 'Working Professionals' },
    { value: 'BOTH',                  label: 'Both'                  },
  ];

  agreementOptions = [
    { value: 'RENTAL_AGREEMENT',  label: 'Rental Agreement' },
    { value: 'LEAVE_AND_LICENSE', label: 'Leave & License'  },
    { value: 'NONE',              label: 'No Agreement'     },
  ];

  sharingTypes = [
    { value: 'ONE_SHARING',   label: 'Single Room'    },
    { value: 'TWO_SHARING',   label: 'Twin Sharing'   },
    { value: 'THREE_SHARING', label: 'Triple Sharing' },
    { value: 'FOUR_SHARING',  label: 'Four Sharing'   },
    { value: 'FIVE_SHARING',  label: 'Five Sharing'   },
  ];

  commonAmenities: string[] = [
    'AC', 'WiFi', 'Geyser', 'Attached Bathroom',
    'Study Table', 'Wardrobe', 'TV', 'Fridge',
    'Washing Machine', 'Power Backup',
  ];

  constructor(
    private pgListingService: PgListingService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  // ── Cover Image ───────────────────────────────────────────────────────────
  onCoverImageSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.coverImageFile = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        this.coverImagePreview = e.target?.result as string;
      };
      reader.readAsDataURL(input.files[0]);
    }
  }

  removeCoverImage(): void {
    this.coverImageFile    = null;
    this.coverImagePreview = null;
  }

  // ── Gallery ───────────────────────────────────────────────────────────────
  onGalleryFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      Array.from(input.files).forEach(file => this.galleryImageFiles.push(file));
    }
  }

  removeGalleryImage(index: number): void {
    this.galleryImageFiles.splice(index, 1);
  }

  // ── Video ─────────────────────────────────────────────────────────────────
  onVideoFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files?.length) this.videoFile = input.files[0];
  }

  removeVideo(): void {
    this.videoFile = null;
  }

  // ── Sharing options ───────────────────────────────────────────────────────
  addSharingOption(): void {
    this.pgModel.sharingOptions.push(new SharingOptionModel());
  }

  removeSharingOption(index: number): void {
    if (this.pgModel.sharingOptions.length > 1) {
      this.pgModel.sharingOptions.splice(index, 1);
    }
  }

  toggleAmenity(optionIndex: number, amenity: string): void {
    const opt = this.pgModel.sharingOptions[optionIndex];
    const idx = opt.amenities.indexOf(amenity);
    if (idx > -1) {
      opt.amenities.splice(idx, 1);
    } else {
      opt.amenities.push(amenity);
    }
  }

  isAmenitySelected(optionIndex: number, amenity: string): boolean {
    return this.pgModel.sharingOptions[optionIndex].amenities.includes(amenity);
  }

  // ── Submit ────────────────────────────────────────────────────────────────
  // STEP 1 → Upload cover image → get URL back from Spring Boot
  // STEP 2 → Upload gallery images → get URLs back
  // STEP 3 → Save all URLs into pgModel → send pgModel as JSON to backend
  async SubmitListing(): Promise<void> {
    if (this.pgForm.invalid) {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
      return;
    }

    this.isSubmitting = true;
    const ownerId = 1;

    try {

      // ── STEP 1: Upload cover image if selected ───────────────────────────
      if (this.coverImageFile) {
        const result = await this.pgListingService
          .uploadImage(this.coverImageFile)
          .toPromise();
        // URL saved here → goes into MySQL as coverImageUrl
        this.pgModel.coverImageUrl = result?.url ?? '';
      }

      // ── STEP 2: Upload gallery images if selected ────────────────────────
      if (this.galleryImageFiles.length > 0) {
        const galleryUrls: string[] = [];
        for (const file of this.galleryImageFiles) {
          const result = await this.pgListingService
            .uploadImage(file)
            .toPromise();
          if (result?.url) galleryUrls.push(result.url);
        }

        this.pgModel.galleryImages = galleryUrls;
      }

      // ── STEP 3: Send complete pgModel as JSON to your existing controller ─
      const payload = this.cleanModel(this.pgModel);

      this.pgListingService.createListing(this.pgModel).subscribe({
        next: (response) => {
          this.isSubmitting  = false;
          this.submitSuccess = true;
          this.snackBar.open('PG listed successfully!', 'Close', { duration: 3000 });
          setTimeout(() => this.router.navigate(['/pg', response.id]), 2000);
        },
        error: (error) => {
          this.isSubmitting = false;
          this.snackBar.open(
            error?.error?.message ?? 'Error submitting listing. Please try again.',
            'Close', { duration: 3000 }
          );
          console.error('Error submitting PG listing:', error);
        }
      });

    } catch (error) {
      this.isSubmitting = false;
      this.snackBar.open('Image upload failed. Please try again.', 'Close', { duration: 3000 });
      console.error('Upload error:', error);
    }
  }

  // ── Converts all empty strings to null so Spring Boot enums don't break ──
  cleanModel(model: any): any {
    const cleaned = { ...model };
    Object.keys(cleaned).forEach(key => {
      if (cleaned[key] === '') cleaned[key] = null;
    });
    cleaned.sharingOptions = model.sharingOptions.map((opt: any) => {
      const cleanedOpt = { ...opt };
      Object.keys(cleanedOpt).forEach(key => {
        if (cleanedOpt[key] === '') cleanedOpt[key] = null;
      });
      return cleanedOpt;
    });
    return cleaned;
  }

  // ── Reset ─────────────────────────────────────────────────────────────────
  resetForm(): void {
    this.pgModel           = new PgModel();
    this.coverImageFile    = null;
    this.coverImagePreview = null;
    this.galleryImageFiles = [];
    this.videoFile         = null;
    this.pgForm.resetForm();
  }

}