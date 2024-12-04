import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { RouterLink,Router } from '@angular/router';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { account } from '../balance/balance.component';
import { CommonModule } from '@angular/common';

interface bill{
  _id: string;
  amount: number;
  nextExecution: string;
  reason:string;
}

@Component({
  selector: 'app-my-bills',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule],
  providers:[BillService],
  templateUrl: './my-bills.component.html',
  styleUrl: './my-bills.component.css'
})
export class MyBillsComponent implements OnInit{
  accounts:account[] = [
  ];
  selectedAccount: string = ''; 
  bills:bill[]=[]
  selectedAccountData: account|undefined = {
    _id:"",
    IBAN:"",
  balance:0,
  billName:""
  };
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService,private router:Router){}
  ngOnInit(): void {
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      this.selectedAccount = this.accounts[0].IBAN;
      this.selectedAccountData = { ...this.accounts[0] };
      const billSub=this.billService.getUserBills(this.selectedAccount).subscribe((response)=>{
        this.bills = response.map((bill:any) => ({
          ...bill,
          nextExecution: new Date(bill.nextExecution), // Convert to Date object if necessary
        }));
      })
      this.subscription.add(billSub)
    })
    this.subscription.add(accountSub);

  }

  onAccountChange() {
    // Find the selected account data
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    )
    this.billService.getUserBills(this.selectedAccount).subscribe((response)=>{
      this.bills = response.map((bill:any) => ({
        ...bill,
        nextExecution: new Date(bill.nextExecution), // Convert to Date object if necessary
      }));
    })
  }
  deleteBillHandler(billId:string){
    this.billService.deleteBill(billId).subscribe((response)=>{
    })
    this.billService.getUserBills(this.selectedAccount).subscribe((response)=>{
      this.bills = response.map((bill:any) => ({
        ...bill,
        nextExecution: new Date(bill.nextExecution), // Convert to Date object if necessary
      }));
    })
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
