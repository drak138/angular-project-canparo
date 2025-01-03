import { CardService } from './../../services/card.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule, NgForm } from '@angular/forms';
import { Component, ViewChild} from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { account } from '../balance/balance.component';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers:[BillService],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {
  accounts:account[] = [
  ];

Models=[
  {model:"Visa"},
  {model:"MasterCard"},
]
Types=[
  {type:"Debit"},
  {type:"Credit"}
]

selectedAccount: string = ''; 
selectedAccountData: account|undefined = {
  _id:"",
  IBAN:"",
  balance:0,
  billName:""};

selectedModel:string=''
selectedModelData:{model:string}|undefined={model:""}


selectedType:string=''
selectedTypeData:{type:string}|undefined={type:""}

creditAmount: number = 0;
private subscription: Subscription = new Subscription();
constructor(private billService:BillService,private router:Router,private cardService:CardService,private route: ActivatedRoute){}

ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const selectedIBAN = params['selectedIBAN'];
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      if (selectedIBAN && this.accounts.some((acc) => acc.IBAN === selectedIBAN)) {
        this.selectedAccount = selectedIBAN;
        this.selectedAccountData = this.accounts.find(
          (account) => account.IBAN === selectedIBAN
        );
      } else if (this.accounts.length > 0) {
        this.selectedAccount = this.accounts[0].IBAN;
        this.selectedAccountData = { ...this.accounts[0] };
      }
    })
    this.subscription.add(accountSub);
  })
  this.selectedModel=this.Models[0].model
  this.selectedModelData=this.Models[0]

  this.selectedType=this.Types[0].type
  this.selectedTypeData=this.Types[0]
}
onAccountChange() {
  // Find the selected account data
  this.selectedAccountData = this.accounts.find(
    (account) => account.IBAN === this.selectedAccount
  );
}

onTypeChange() {
  // Find the selected account data
  this.selectedTypeData = this.Types.find(
    (account) => account.type === this.selectedType
  );
  if (this.selectedType !== 'Credit') {
    this.creditAmount = 0;
  }
}

onModelChange() {
  // Find the selected account data
  this.selectedModelData = this.Models.find(
    (account) => account.model === this.selectedModel
  );
}

@ViewChild("createCardForm")form:NgForm|undefined
createCardHandler():void{
  if(this.form?.value.creditAmount<100){
    return alert("Сума за кредит трябва да е над 100")
  }
  this.cardService.createCard(this.form?.value).subscribe((response)=>{
    window.location.href = '/card/myCards'
  })
}
  // Enable/disable creditAmount based on cardType selection
  // this.form.get('cardType')?.valueChanges.subscribe((value) => {
  //   if (value === 'Credit') {
  //     this.form.get('creditAmount')?.enable();
  //   } else {
  //     this.form.get('creditAmount')?.disable();
  //   }
  // })
}
