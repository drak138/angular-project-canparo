import { CardService } from './../../services/card.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormsModule, NgForm } from '@angular/forms';
import { Component, ViewChild} from '@angular/core';
import { BillService } from '../../services/bill.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-card',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule],
  providers:[BillService],
  templateUrl: './create-card.component.html',
  styleUrl: './create-card.component.css'
})
export class CreateCardComponent {
  accounts:any[] = [
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
selectedAccountData: any = {};

selectedModel:string=''
selectedModelData:any={}


selectedType:string=''
selectedTypeData:any={}

creditAmount: number = 0;
private subscription: Subscription = new Subscription();
constructor(private billService:BillService,private router:Router,private cardService:CardService){}

ngOnInit(): void {
  const accountSub=this.billService.checkUserBills().subscribe((response)=>{
    this.accounts=response.hasBills
    this.selectedAccount = this.accounts[0].IBAN;
    this.selectedAccountData = { ...this.accounts[0] };
  })
  this.selectedModel=this.Models[0].model
  this.selectedModelData=this.Models[0]

  this.selectedType=this.Types[0].type
  this.selectedTypeData=this.Types[0]

  this.subscription.add(accountSub);
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
