import { Component, OnInit } from '@angular/core';
import { Account } from '../../entity/Account';
import { AccountService } from '../../service/account.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { first } from 'rxjs';


@Component({
  selector: 'app-account',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSnackBarModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent {

  user: Account = new Account();
  confirmPassword: string = '';

  constructor(
    private accountSerivce: AccountService,
    private route: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar
  ) { }

  Register(): void {

    const firstName = this.user.firstName;
    const lastName = this.user.lastName;
    const email = this.user.email;
    const phone = this.user.phone;
    const password = this.user.password ?? '';

    if (firstName === '' || lastName === '' || email === '' || phone === '' || password === '') {
      this.snackBar.open('Please fill all the fields', 'Close', {
        duration: 3000
      });
      return;
    } else if (!email.includes('@')) {
      this.snackBar.open('Please enter a valid email address', 'Close', {
        duration: 3000
      });
      return;
    } else if (password.length < 6) {
      this.snackBar.open('Password must be at least 6 characters long', 'Close', {
        duration: 3000
      });
      return;
    } else if (phone.length < 10) {
      this.snackBar.open('Phone number must be at least 10 digits long', 'Close', {
        duration: 3000
      });
      return;
    } else if (firstName.length < 2 || lastName.length < 2) {
      this.snackBar.open('First and Last names must be at least 3 characters long', 'Close', {
        duration: 3000
      });
      return;
    } else if (firstName.length > 20 || lastName.length > 20) {
      this.snackBar.open('First and Last names must be at most 20 characters long', 'Close', {
        duration: 3000
      });
      return;
    } else if (firstName.includes(' ') || lastName.includes(' ')) {
      this.snackBar.open('First and Last names cannot contain spaces', 'Close', {
        duration: 3000
      });
      return;
    } else if (phone.includes(' ')) {
      this.snackBar.open('Phone number cannot contain spaces', 'Close', {
        duration: 3000
      });
      return;
    } else if (!/^[a-zA-Z]+$/.test(firstName) || !/^[a-zA-Z]+$/.test(lastName)) {
      this.snackBar.open('First and Last names must contain only letters', 'Close', {
        duration: 3000
      });
      return;
    } else if (!/^\d+$/.test(phone)) {
      this.snackBar.open('Phone number must contain only digits', 'Close', {
        duration: 3000
      });
      return;
    } else if (!/^[a-zA-Z0-9]+$/.test(password)) {
      this.snackBar.open('Password must contain only letters and numbers', 'Close', {
        duration: 3000
      });
      return;
    } else if (this.user.password !== this.confirmPassword) {
      this.snackBar.open('Password Does Not Match', 'Close', {
        duration: 3000
      });
      return;
    }
    console.log('User being sent:', this.user);
    this.accountSerivce.createUser(this.user).subscribe({
      next: (response) => {
        console.log('Registration successful', response);
        this.snackBar.open('Account created successfully!', 'Close', {
          duration: 3000
        });
        this.route.navigate(['/login']);
      },

      error: (error) => {
        console.error('Registration failed', error);
        if (error.error && error.error.error) {
          this.snackBar.open(error.error.error, 'Close', { duration: 3000 });
        } else {
          this.snackBar.open('An error occurred during registration.', 'Close', { duration: 3000 });
        }
      }
    });
  }
}
