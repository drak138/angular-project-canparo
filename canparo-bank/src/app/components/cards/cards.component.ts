import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { BillService } from '../../services/bill.service';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css'
})
export class CardsComponent {
  accounts:any[] = [
  ];
  cards:any[]=[]

  selectedAccount: string = ''; 
  selectedAccountData: any = {};
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService,private router:Router,private cardService:CardService){}
  ngOnInit(): void {
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      this.selectedAccount = this.accounts[0].IBAN;
      this.selectedAccountData = { ...this.accounts[0] };
      const cardsSub=this.cardService.getCards(this.selectedAccount).subscribe((response)=>{
        this.cards=this.maskCardNumbers(response)
      })
      this.subscription.add(cardsSub)
    })
    this.subscription.add(accountSub);
  }

  onAccountChange() {
    // Find the selected account data
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    );
    this.cardService.getCards(this.selectedAccount).subscribe((response)=>{
      this.cards=this.maskCardNumbers(response)
    })
  }

  maskCardNumbers(cards: any[]): any[] {
    return cards.map(card => {
      return {
        ...card, // Preserve other properties of the card
        cardNumber: this.maskCardNumber(card.cardNumber.toString()),// Mask the cardNumber
      };
    });
  }
  private maskCardNumber(cardNumber: string): string {
    if (cardNumber.length > 8) {
      return cardNumber.slice(0, cardNumber.length - 8) + '****' + cardNumber.slice(-4);
    }
    return cardNumber;
  }
  navigateToCreateCard(){
    this.router.navigate(["/card/create"],{
      queryParams: { selectedIBAN: this.selectedAccountData.IBAN },
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('Component destroyed, subscriptions cleaned up.');
  }
}
