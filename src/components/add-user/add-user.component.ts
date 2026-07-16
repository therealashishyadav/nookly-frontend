import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { AccountService } from '../../service/account.service';


@Component({
  selector: 'app-add-user',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})
export class AddUserComponent {
  // Form model (does not include confirmPassword)
  user = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    role: 'OWNER', // default
  };

  confirmPassword = '';
  isLoading = false;

  roles = ['OWNER', 'MANAGEMENT'];

  constructor(
    private accountService: AccountService,
    private router: Router,
    private snackBar: MatSnackBar,
  ) {}

  registerUser(): void {
    // Validate required fields
    if (!this.user.firstName || !this.user.lastName || !this.user.email || !this.user.phone || !this.user.password) {
      this.snackBar.open('Please fill all required fields.', 'Close', { duration: 3000 });
      return;
    }

    // Validate password match
    if (this.user.password !== this.confirmPassword) {
      this.snackBar.open('Passwords do not match.', 'Close', { duration: 3000 });
      return;
    }

    // Prepare payload for backend
    const payload = {
      firstName: this.user.firstName,
      lastName: this.user.lastName,
      email: this.user.email,
      phone: this.user.phone,
      password: this.user.password,
      confirm_password: this.confirmPassword, // backend expects snake_case
      role: this.user.role,
    };

    this.isLoading = true;

    this.accountService.createUser(payload).subscribe({
      next: () => {
        this.snackBar.open(`${this.user.role} registered successfully!`, 'Close', { duration: 3000 });
        this.resetForm();
        this.router.navigate(['/management']);
      },
      error: (err) => {
        console.error('Registration failed:', err);
        let errorMsg = 'Registration failed. Please try again.';
        if (err.error?.message) {
          errorMsg = err.error.message;
        } else if (err.status === 409) {
          errorMsg = 'User with this email or phone already exists.';
        } else if (err.status === 400) {
          errorMsg = 'Invalid input. Check all fields.';
        }
        this.snackBar.open(errorMsg, 'Close', { duration: 4000 });
        this.isLoading = false;
      },
    });
  }

  resetForm(): void {
    this.user = { firstName: '', lastName: '', email: '', phone: '', password: '', role: 'OWNER' };
    this.confirmPassword = '';
    this.isLoading = false;
  }
}