import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-my-bills',
  standalone: true,
  imports: [RouterLink,FormsModule],
  providers:[BillService],
  templateUrl: './my-bills.component.html',
  styleUrl: './my-bills.component.css'
})
export class MyBillsComponent implements OnInit{
  accounts:any[] = [
  ];
  selectedAccount: string = ''; 
  selectedAccountData: any = {};
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService,private router:Router){}
  ngOnInit(): void {
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      this.selectedAccount = this.accounts[0].IBAN;
      this.selectedAccountData = { ...this.accounts[0] };
    })
    this.subscription.add(accountSub);

  }

  onAccountChange() {
    // Find the selected account data
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    console.log('Component destroyed, subscriptions cleaned up.');
  }
}
