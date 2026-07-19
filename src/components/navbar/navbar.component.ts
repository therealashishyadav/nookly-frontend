import { Component, HostListener, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Meta } from '@angular/platform-browser';

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
  isLoggedIn = false;

  constructor(private router: Router, private meta: Meta) {}

  ngOnInit(): void {
    this.checkLoginStatus();
    this.setSiteMetaTags();
  }

  private setSiteMetaTags(): void {
    this.meta.updateTag({ property: 'og:site_name', content: 'Crib' });
    this.meta.updateTag({ name: 'application-name', content: 'Crib' });
    this.meta.updateTag({ name: 'theme-color', content: '#4A90E2' });
    this.meta.updateTag({ name: 'twitter:site', content: '@cribindia' });
  }

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
    this.checkLoginStatus();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.isScrolled = window.scrollY > 10;
  }
}