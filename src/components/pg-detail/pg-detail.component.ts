// src/app/components/pg-detail/pg-detail.component.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { NavbarComponent } from '../navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';
import { PgListingService } from '../../service/pg-listing.service';
import { PgListingResponse } from '../../entity/PgModel';

@Component({
  selector: 'app-pg-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    NavbarComponent,
    FooterComponent,
  ],
  templateUrl: './pg-detail.component.html',
  styleUrls: ['./pg-detail.component.css']
})
export class PgDetailComponent implements OnInit {

  pg: PgListingResponse | null = null;
  isLoading = true;
  error: string | null = null;

  // Gallery state
  activeImageIndex = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pgListingService: PgListingService
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.pgListingService.getListingById(Number(id)).subscribe({
        next: (data) => {
          this.pg = data;
          this.isLoading = false;
        },
        error: (err) => {
          this.error = 'Could not load PG details. Please try again.';
          this.isLoading = false;
          console.error('Error loading PG:', err);
        }
      });
    }
  }

  // ── Gallery ───────────────────────────────────────────────────────────────
  get allImages(): string[] {
    if (!this.pg) return [];
    const images: string[] = [];
    if (this.pg.coverImageUrl) images.push(this.pg.coverImageUrl);
    if (this.pg.galleryImages?.length) images.push(...this.pg.galleryImages);
    return images;
  }

  setActiveImage(index: number): void {
    this.activeImageIndex = index;
  }

  prevImage(): void {
    this.activeImageIndex =
      (this.activeImageIndex - 1 + this.allImages.length) % this.allImages.length;
  }

  nextImage(): void {
    this.activeImageIndex =
      (this.activeImageIndex + 1) % this.allImages.length;
  }

  // ── Contact actions ───────────────────────────────────────────────────────
  callOwner(): void {
    if (this.pg?.contactNumber) {
      window.location.href = `tel:${this.pg.contactNumber}`;
    }
  }

  whatsappOwner(): void {
    if (this.pg?.whatsappNumber) {
      const message = encodeURIComponent(
        `Hi, I found your PG "${this.pg.pgName}" on Nookly and I'm interested. Can you share more details?`
      );
      window.open(`https://wa.me/91${this.pg.whatsappNumber}?text=${message}`, '_blank');
    }
  }

  openMap(): void {
    if (this.pg?.googleMapLink) {
      window.open(this.pg.googleMapLink, '_blank');
    }
  }

  // ── Helpers ───────────────────────────────────────────────────────────────
  getLowestPrice(): number {
    if (!this.pg?.sharingOptions?.length) return 0;
    return Math.min(...this.pg.sharingOptions.map(o => o.pricePerMonth));
  }

  getOccupancyLabel(): string {
    const map: Record<string, string> = {
      GIRLS: 'Girls Only',
      BOYS: 'Boys Only',
      COED: 'Co-ed',
    };
    return map[this.pg?.occupancyType ?? ''] ?? this.pg?.occupancyType ?? '';
  }

  getSharingLabel(type: string): string {
    const map: Record<string, string> = {
      ONE_SHARING: 'Single Room',
      TWO_SHARING: 'Twin Sharing',
      THREE_SHARING: 'Triple Sharing',
      FOUR_SHARING: 'Four Sharing',
      FIVE_SHARING: 'Five Sharing',
    };
    return map[type] ?? type;
  }

  goBack(): void {
    this.router.navigate(['/listings']);
  }

  // Amenity icon mapping
  getAmenityIcon(amenity: string): string {
    const map: Record<string, string> = {
      'WiFi': 'wifi',
      'AC': 'ac_unit',
      'Geyser': 'hot_tub',
      'Attached Bathroom': 'bathroom',
      'Study Table': 'desk',
      'Wardrobe': 'checkroom',
      'TV': 'tv',
      'Fridge': 'kitchen',
      'Washing Machine': 'local_laundry_service',
      'Power Backup': 'battery_charging_full',
    };
    return map[amenity] ?? 'check_circle';
  }
}