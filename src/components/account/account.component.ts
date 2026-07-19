import { Component, OnInit } from '@angular/core';
import { Account } from '../../entity/Account';
import { AccountService } from '../../service/account.service';
import { HttpClient } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta, Title } from '@angular/platform-browser';
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
    MatIconModule,
    MatCheckboxModule,
    RouterLink
  ],
  templateUrl: './account.component.html',
  styleUrl: './account.component.css'
})
export class AccountComponent implements OnInit {

  user: Account = new Account();
  confirmPassword: string = '';
  acceptedTerms: boolean = false;
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;

  constructor(
    private accountSerivce: AccountService,
    private route: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private meta: Meta,
    private title: Title
  ) { }

  ngOnInit(): void {
    this.setSeoMetaTags();
  }

  private setSeoMetaTags(): void {
    const pageTitle = 'Create Your Crib Account | Sign Up';
    const pageDescription = 'Create a free Crib account to discover verified PGs, flats and co-living spaces across India, or list your property for renters to find.';

    this.title.setTitle(pageTitle);
    this.meta.updateTag({ name: 'description', content: pageDescription });
    this.meta.updateTag({ name: 'robots', content: 'index, follow' });
    this.meta.updateTag({ property: 'og:title', content: pageTitle });
    this.meta.updateTag({ property: 'og:description', content: pageDescription });
    this.meta.updateTag({ property: 'og:type', content: 'website' });
    this.meta.updateTag({ name: 'twitter:card', content: 'summary' });
    this.meta.updateTag({ name: 'twitter:title', content: pageTitle });
    this.meta.updateTag({ name: 'twitter:description', content: pageDescription });
  }

  toggleShowPassword(): void {
    this.showPassword = !this.showPassword;
  }

  toggleShowConfirmPassword(): void {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  signInWithGoogle(): void {
    this.snackBar.open('Google sign up is coming soon', 'Close', { duration: 3000 });
  }

  signInWithFacebook(): void {
    this.snackBar.open('Facebook sign up is coming soon', 'Close', { duration: 3000 });
  }

  signInWithTwitter(): void {
    this.snackBar.open('Twitter sign up is coming soon', 'Close', { duration: 3000 });
  }

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
    } else if (!this.acceptedTerms) {
      this.snackBar.open('Please accept the Terms and Conditions to continue', 'Close', {
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