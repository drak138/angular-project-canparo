import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers:[CardService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{
  cardId: string | null = '';
  cardDetails: any = {};
  cardNumber:string=''
  constructor(private route: ActivatedRoute, private cardService: CardService,private router:Router) {}
  ngOnInit(): void {
    // Get the card ID from the route parameters
    this.cardId = this.route.snapshot.paramMap.get('id');

    if (this.cardId) {
      // Fetch card details using the service
      this.cardService.getCardDetails(this.cardId).subscribe((details) => {
        this.cardDetails = details;
        this.cardNumber=this.maskCardNumber(this.cardDetails.cardNumber.toString())
        console.log(this.cardDetails)
      });
    }
  }

  maskCardNumber(cardNumber: string): string {
    if (cardNumber.length > 8) {
      return cardNumber.slice(0, cardNumber.length - 8) + '****' + cardNumber.slice(-4);
    }
    return cardNumber;
  }
  deactivateHandler(){
    if(!this.cardId){
      return
    }
    this.cardService.deactivateCard(this.cardId).subscribe((response)=>{
      window.location.href = '/card/myCards'
    })
  }
  focusInput(inputElement: HTMLInputElement,event: Event): void {
    event.preventDefault();
    inputElement.focus(); // Programmatically focus the input
  }
  @ViewChild("updateCard")form:NgForm|undefined
  updateCardHandler(){
    console.log(this.form?.value)
    if(this.form?.value.dayWithDrawLimit<1000){
      return alert("24ч. лимит за теглене в брой трябва да е 1000 или повече")
    }
    if(this.form?.value.dayLimitWithTrader<1000){
      return alert("24ч. лимит за плащане при търговец трябва да е 1000 или повече")
    }
    if(this.form?.value.dayLimit<1000){
      return alert("Общ 24ч. лимит трябва да е 1000 или повече")
    }
    if(!this.cardId){
      return
    }
    this.cardService.updateCard(this.cardId,this.form?.value).subscribe((response)=>{
      this.router.navigate(["/card/myCards"])
    })
  }
}
