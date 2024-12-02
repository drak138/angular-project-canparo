import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  currentSlide = 0;

  navigate(direction: 'left' | 'right'): void {
    if (direction === 'left') {
      this.currentSlide = (this.currentSlide - 1 + 3) % 3; // Wrap around to the last slide
    } else {
      this.currentSlide = (this.currentSlide + 1) % 3; // Wrap around to the first slide
    }
  }
}
