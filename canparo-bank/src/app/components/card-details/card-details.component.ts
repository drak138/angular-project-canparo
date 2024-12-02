import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CardService } from '../../services/card.service';

@Component({
  selector: 'app-card-details',
  standalone: true,
  imports: [],
  providers:[CardService],
  templateUrl: './card-details.component.html',
  styleUrl: './card-details.component.css'
})
export class CardDetailsComponent implements OnInit{
  cardId: string | null = null;
  cardDetails: any = null;
  constructor(private route: ActivatedRoute, private cardService: CardService) {}
  ngOnInit(): void {
    // Get the card ID from the route parameters
    this.cardId = this.route.snapshot.paramMap.get('id');

    if (this.cardId) {
      // Fetch card details using the service
      this.cardService.getCardDetails(this.cardId).subscribe((details) => {
        this.cardDetails = details;
        console.log(this.cardDetails)
      });
    }
  }
}
