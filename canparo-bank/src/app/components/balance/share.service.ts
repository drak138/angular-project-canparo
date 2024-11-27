import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ShareService {
  private renderer: Renderer2;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = this.rendererFactory.createRenderer(null, null);
  }

  isMobileDevice(): boolean {
    return /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  async shareIBAN(iban: string): Promise<void> {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Share IBAN',
          text: `IBAN: ${iban}`,
        });
      } catch (error) {
        console.error('Error sharing IBAN:', error);
      }
    } else {
      console.warn('Web Share API not supported on this device.');
    }
  }

  copyToClipboard(text: string, copiedTextElement?: HTMLElement, event?: MouseEvent): void {
    navigator.clipboard.writeText(text).then(() => {
      if (copiedTextElement && event) {
        // Display the copied text indicator
        this.showCopiedText(copiedTextElement, event.clientX, event.clientY);
      }
    }).catch(err => {
      console.error('Error copying text:', err);
    });
  }

  showCopiedText(element: HTMLElement, x: number, y: number): void {
    this.renderer.setStyle(element, 'display', 'block');
    this.renderer.setStyle(element, 'left', `${x + 10}px`);
    this.renderer.setStyle(element, 'top', `${y}px`);

    setTimeout(() => {
      this.renderer.setStyle(element, 'display', 'none');
    }, 1500);
  }

  openMessenger(iban: string): void {
    const messengerUrl = `https://www.messenger.com/t/?text=${encodeURIComponent('IBAN: ' + iban)}`;
    window.open(messengerUrl, '_blank');
  }

  openWhatsApp(iban: string): void {
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('IBAN: ' + iban)}`;
    window.open(whatsappUrl, '_blank');
  }

  toggleDropdown(dropdownElement: HTMLElement): void {
    const currentDisplay = getComputedStyle(dropdownElement).display;
    this.renderer.setStyle(dropdownElement, 'display', currentDisplay === 'block' ? 'none' : 'block');
  }

  closeDropdownOnClickOutside(dropdownElement: HTMLElement, triggerElement: HTMLElement): void {
    this.renderer.listen('window', 'click', (event: Event) => {
      if (!dropdownElement.contains(event.target as Node) && !triggerElement.contains(event.target as Node)) {
        this.renderer.setStyle(dropdownElement, 'display', 'none');
      }
    });
  }
}

