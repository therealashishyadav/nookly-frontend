import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, ActivatedRoute } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NavbarComponent } from '../navbar/navbar.component';
import { TenantService } from '../../service/tenant.service';
import { Tenant } from '../../entity/Tenant';
import { OwnerNavbarComponent } from "../owner-navbar/owner-navbar.component";

@Component({
  selector: 'app-add-tenant',
  standalone: true,
  imports: [
    CommonModule, FormsModule, RouterLink,
    MatFormFieldModule, MatInputModule, MatButtonModule,
    MatSnackBarModule, MatIconModule, MatCheckboxModule,
    OwnerNavbarComponent, MatSelectModule
  ],
  templateUrl: './add-tenant.component.html',
  styleUrls: ['./add-tenant.component.css']
})
export class AddTenantComponent implements OnInit {

  ownerPgs: any[] = [];
  isLoadingPgs = false;

  tenant: Tenant = new Tenant();
  isEditing = false;
  tenantId?: number;
  isLoading = false;

  constructor(
    private tenantService: TenantService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private http: HttpClient

  ) { }

  ngOnInit(): void {
    this.loadOwnerPgs(); // load PGs for dropdown
  const id = this.route.snapshot.queryParamMap.get('id');
    if (id) {
      this.isEditing = true;
      this.tenantId = +id;
      this.tenantService.getAllTenants().subscribe({
        next: (tenants) => {
          const found = tenants.find(t => t.id === this.tenantId);
          if (found) this.tenant = { ...found };
        }
      });
    }
  }
  loadOwnerPgs(): void {
    this.isLoadingPgs = true;
    const token = localStorage.getItem('token') ?? '';
    const headers = new HttpHeaders({ Authorization: `Bearer ${token}` });
    this.http.get<any>(`${environment.apiUrl}/api/pg-listings/my`, { headers }).subscribe({
      next: (res) => {
        // handle both paginated and plain array responses
        this.ownerPgs = Array.isArray(res) ? res : (res.content ?? []);
        this.isLoadingPgs = false;
      },
      error: () => { this.isLoadingPgs = false; }
    });
  }
  save(): void {
    if (!this.tenant.fullName || !this.tenant.phone ||
      !this.tenant.roomNumber || !this.tenant.monthlyRent) {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
      return;
    }

    this.isLoading = true;

    if (this.isEditing && this.tenantId) {
      this.tenantService.updateTenant(this.tenantId, this.tenant).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Tenant updated successfully.', 'Close', { duration: 3000 });
          this.router.navigate(['/owner/tenants']);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Error updating tenant.', 'Close', { duration: 3000 });
        }
      });
    } else {
      this.tenantService.addTenant(this.tenant).subscribe({
        next: () => {
          this.isLoading = false;
          this.snackBar.open('Tenant added successfully.', 'Close', { duration: 3000 });
          this.router.navigate(['/owner/tenants']);
        },
        error: () => {
          this.isLoading = false;
          this.snackBar.open('Error adding tenant.', 'Close', { duration: 3000 });
        }
      });
    }
  }
}