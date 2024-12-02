import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [CommonModule],
  providers:[CardService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{
  cardId: string | null = '';
  cardDetails: any = {};
  cardNumber:string=''
  constructor(private route: ActivatedRoute, private cardService: CardService) {}
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
}
