import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.css'
})
export class CreateBillComponent {
  accounts = [
    { name: 'Преслав Красимиров Гешев', iban: 'BG27STAJG095497650274', balance: '57.90' },
    { name: 'Jhon Doe', iban: 'G27STAJG012345678901', balance: '450.00' },
  ]
}
