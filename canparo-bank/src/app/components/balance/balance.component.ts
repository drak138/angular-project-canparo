import { Component,HostListener, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common'
import { Router, RouterLink } from '@angular/router';
import { ShareService } from './share.service';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface account{
  _id:string;
  IBAN:string;
  balance:number;
  billName:string
  }
interface history{
  IBAN:string;
  amount:number;
  more:string|null;
  name:string;
  reason:string;
  transferDate:string;
  transferType:string
}

@Component({
  selector: 'app-balance',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  providers:[ShareService,BillService],
  templateUrl: './balance.component.html',
  styleUrl: './balance.component.css'
})

export class BalanceComponent implements OnInit{
  // export class BalanceComponent {

  accounts:account[] = [
  ];
  transferHistory:history[]=[

  ]

  selectedAccount: string = ''; 
  selectedAccountData: account|undefined = {
    _id:"",
    IBAN:'',
    balance:123,
    billName:""};
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService,private router:Router){}

  ngOnInit(): void {
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      this.selectedAccount = this.accounts[0].IBAN;
      this.selectedAccountData = { ...this.accounts[0] };
      const historySub=this.billService.getHistory("All",this.selectedAccount).subscribe((response)=>{
        this.transferHistory=response.reverse()
      })
    this.subscription.add(historySub)
    })
    this.subscription.add(accountSub);
  }

  onAccountChange() {
    // Find the selected account data
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    );
    if(!this.selectedAccountData){
      return
    }
    this.billService.getHistory("All",this.selectedAccountData.IBAN).subscribe((response)=>{
      this.transferHistory=response.reverse()
    })
  }
  showAll(){
    if(!this.selectedAccountData){
      return
    }
    this.billService.getHistory("All",this.selectedAccountData.IBAN).subscribe((response)=>{
      this.transferHistory=response.reverse()
    })
  }
  showPositive(){
    if(!this.selectedAccountData){
      return
    }
    this.billService.getHistory("incoming",this.selectedAccountData.IBAN).subscribe((response)=>{
      this.transferHistory=response.reverse()
    })
  }
  showNegative(){
    if(!this.selectedAccountData){
      return
    }
    this.billService.getHistory("outgoing",this.selectedAccountData.IBAN).subscribe((response)=>{
      this.transferHistory=response.reverse()
    })
  }

  navigateToTransfer(){
    if(!this.selectedAccountData){
      return
    }
    this.router.navigate(["/card/transfer"],{
      queryParams: { selectedIBAN: this.selectedAccountData.IBAN },
    })
  }
  deleteUserBill(billId:string|undefined){
    this.billService.deleteUserBill(billId).subscribe()
    window.location.reload()
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
    if(!this.selectedAccountData){
      return
    }
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent('IBAN: ' + this.selectedAccountData.IBAN)}`;
    window.open(whatsappUrl, '_blank');
  }

  // Share via Messenger
  shareViaMessenger(): void {
    if(!this.selectedAccountData){
      return
    }
    const messengerUrl = `https://www.messenger.com/t/?text=${encodeURIComponent('IBAN: ' + this.selectedAccountData.IBAN)}`;
    window.open(messengerUrl, '_blank');
  }

  // Copy IBAN to clipboard
  copyIban(event: MouseEvent): void {
    if(!this.selectedAccountData){
      return
    }
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
  }

}
