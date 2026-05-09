
// import { Component, HostListener } from '@angular/core';
// import { RouterLink } from '@angular/router';
// import { NgIf } from '@angular/common';

// @Component({
//   selector: 'app-navbar',
//   standalone: true,
//   imports: [
//     RouterLink,
//   ],
//   templateUrl: './navbar.component.html',
//   styleUrl: './navbar.component.css'
// })
// export class NavbarComponent {

//   isScrolled  = false;
//   isMenuOpen  = false;
//   showSearch  = false;
 
//   @HostListener('window:scroll')
//   onScroll(): void {
//     this.isScrolled = window.scrollY > 20;
//   }
 
//   toggleMenu(): void {
//     this.isMenuOpen = !this.isMenuOpen;
//     // Lock body scroll when mobile menu is open
//     document.body.style.overflow = this.isMenuOpen ? 'hidden' : '';
//   }
 
//   closeMenu(): void {
//     this.isMenuOpen = false;
//     document.body.style.overflow = '';
//   }

//   toggleSearch(): void {
//     this.showSearch = !this.showSearch;
//   }
// }


import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  isScrolled = false;
  isMenuOpen = false;
  showSearch = false;
  isLoggedIn = false; // ← tracks login state

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  // Check if token exists in localStorage
  checkLoginStatus(): void {
    const token = localStorage.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('ownerPhone');
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
    this.closeMenu();
  }

  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu(): void {
    this.isMenuOpen = false;
    this.checkLoginStatus(); // recheck on every navigation
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }
}