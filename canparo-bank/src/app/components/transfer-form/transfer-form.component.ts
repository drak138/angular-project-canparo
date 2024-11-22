import { CommonModule } from '@angular/common';
import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent {
  accounts = [
    { name: 'Преслав Красимиров Гешев', iban: 'BG27STAJG095497650274', balance: '57.90' },
    { name: 'Jhon Doe', iban: 'G27STAJG012345678901', balance: '450.00' },
  ]
  @Input()btn={
    text:"hello there",
    class:"send-transfer"
  }
  @Input()formClass=''
}
