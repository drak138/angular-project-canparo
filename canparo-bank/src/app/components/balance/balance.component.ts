import { Component,HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'
import { TransfersComponent } from './transfers/transfers.component';
import { RouterLink } from '@angular/router';
import { ShareService } from './share.service';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [TransfersComponent,RouterLink,CommonModule,FormsModule],
  providers:[ShareService,BillService],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})
export class BalanceComponent implements OnInit{
  // export class BalanceComponent {
  
  accounts:any[] = [
  ];
  transferHistory:any[]=[

  ]

  selectedAccount: string = ''; 
  selectedAccountData: any = {};
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService){}

  ngOnInit(): void {
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      this.selectedAccount = this.accounts[0].IBAN;
      this.selectedAccountData = { ...this.accounts[0] };
    })
    // const historySub=this.billService.getHistory().subscribe((response)=>{
    //   this.transferHistory=response
    // })
    this.subscription.add(accountSub);
    // this.subscription.add(historySub)
  }

  onAccountChange() {
    // Find the selected account data
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    );
  }

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
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('IBAN: ' + this.selectedAccountData.IBAN)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Share via Messenger
  shareViaMessenger(): void {
    const messengerUrl = `https://www.messenger.com/t/?text=${encodeURIComponent('IBAN: ' + this.selectedAccountData.IBAN)}`;
    window.open(messengerUrl, '_blank');
  }

  // Copy IBAN to clipboard
  copyIban(event: MouseEvent): void {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    navigator.clipboard.writeText(this.selectedAccountData.IBAN).then(
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


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('Component destroyed, subscriptions cleaned up.');
  }

}
