import { Component, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-coming-soon-page',
  standalone: true,
  imports: [],
  templateUrl: './coming-soon-page.component.html',
  styleUrl: './coming-soon-page.component.css'
})
export class ComingSoonPageComponent {
  @Input() featureName: string = 'This feature';
  @Input() message: string = 'We are working hard to bring this to you!';
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }
}
