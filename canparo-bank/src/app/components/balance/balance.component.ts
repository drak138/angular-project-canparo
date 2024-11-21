import { Component,HostListener } from '@angular/core';
import { CommonModule } from '@angular/common'
import { TransfersComponent } from './transfers/transfers.component';
import { RouterLink } from '@angular/router';
import { ShareService } from './share.service';

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [TransfersComponent,RouterLink,CommonModule],
  providers:[ShareService],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent {
  // export class BalanceComponent {
  iban: string = 'BG27STAJG095497650274';
  accounts = [
    { name: 'Преслав Красимиров Гешев', iban: 'BG27STAJG095497650274', balance: '57.90' },
    { name: 'Jhon Doe', iban: 'G27STAJG012345678901', balance: '450.00' },
  ];
  showShareOptions = false;
  copied = true;
  mouseX = 0;
  mouseY = 0;

  // Toggle share options visibility
  onShareButtonClick(event: Event): void {
    this.showShareOptions = !this.showShareOptions;
    event.stopPropagation();
  }

  // Share via WhatsApp
  shareViaWhatsApp(): void {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('IBAN: ' + this.iban)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Share via Messenger
  shareViaMessenger(): void {
    const messengerUrl = `https://www.messenger.com/t/?text=${encodeURIComponent('IBAN: ' + this.iban)}`;
    window.open(messengerUrl, '_blank');
  }

  // Copy IBAN to clipboard
  copyIban(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    navigator.clipboard.writeText(this.iban).then(
      () => {
        this.copied = true;
        // Hide "Copied!" message after a timeout
        setTimeout(() => {
          this.copied = false;
        }, 500);
      },
      (err) => {
        console.error('Error copying IBAN:', err);
      }
    );
  }


  // Close share options if clicked outside
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const target = event.target as HTMLElement;
    const shareButton = document.getElementById('shareButton');
    const shareOptions = document.getElementById('shareOptions');

    if (
      !shareButton?.contains(target) &&
      !shareOptions?.contains(target)
    ) {
      this.showShareOptions = false;
    }
  }
}
