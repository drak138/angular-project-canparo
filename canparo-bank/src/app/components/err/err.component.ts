import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-err',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './err.component.html',
  styleUrl: './err.component.css'
})
export class ErrComponent {
@Input() errorMessage="hello There"
}
