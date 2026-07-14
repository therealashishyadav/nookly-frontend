import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { ComingSoonPageComponent } from '../coming-soon-page/coming-soon-page.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterLink, CommonModule, ComingSoonPageComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  showComingSoon = false;

  featureName = 'feature';
  comingSoonMessage = 'We are working hard to bring this to you!';

  openComingSoon(event: Event): void {
    event.preventDefault();
    this.showComingSoon = true;
  }
  closeComingSoon(): void {
    this.showComingSoon = false;
  }

  openCareers(event: Event): void {
  event.preventDefault();
  this.featureName = 'Careers';
  this.showComingSoon = true;
}

openPress(event: Event): void {
  event.preventDefault();
  this.featureName = 'Press';
  this.showComingSoon = true;
}

openBlog(event: Event): void {
  event.preventDefault();
  this.featureName = 'Blog';
  this.showComingSoon = true;
}

openDuplexes(event: Event): void {
  event.preventDefault();
  this.featureName = 'Duplexes';
  this.showComingSoon = true;
}

}
