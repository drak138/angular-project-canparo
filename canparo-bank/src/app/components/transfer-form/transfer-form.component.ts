import { CommonModule } from '@angular/common';
import { Component,Input,ChangeDetectorRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { BillService } from '../../services/bill.service';
import { FormsModule } from '@angular/forms';
import { ErrComponent } from '../err/err.component';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-transfer-form',
  standalone: true,
  imports: [CommonModule,FormsModule,ErrComponent],
  providers:[BillService],
  templateUrl: './transfer-form.component.html',
  styleUrl: './transfer-form.component.css'
})
export class TransferFormComponent {
  heck="ubigre"
  accounts:any[] = [
  ];

  selectedAccount: string = ''; 
  selectedAccountData: any = {};
  private subscription: Subscription = new Subscription();
  constructor(private billService:BillService,private route: ActivatedRoute,){}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params) => {
      const selectedIBAN = params['selectedIBAN'];
    const accountSub=this.billService.checkUserBills().subscribe((response)=>{
      this.accounts=response.hasBills
      if (selectedIBAN && this.accounts.some((acc) => acc.IBAN === selectedIBAN)) {
        // If selectedIBAN exists, use it
        this.selectedAccount = selectedIBAN;
        this.selectedAccountData = this.accounts.find(
          (account) => account.IBAN === selectedIBAN
        );
      } else if (this.accounts.length > 0) {
        // Otherwise, default to the first account
        this.selectedAccount = this.accounts[0].IBAN;
        this.selectedAccountData = { ...this.accounts[0] };
      }
    })
    
    this.subscription.add(accountSub);
  })
  }

  onAccountChange() {
    // Find the selected account data
    console.log(JSON.stringify(this.selectedAccount))
    this.selectedAccountData = this.accounts.find(
      (account) => account.IBAN === this.selectedAccount
    );
    
  }
  @Input()btn={
    text:"hello there",
    class:"send-transfer"
  }
  @Input()formClass=''
  @Input()formName=''
  @Input() formEvent!: (event: any)=> void;
  formValues: any = {};
  
  handleSubmit(formValues: any): void {
    const { billName, IBAN, balance } = this.selectedAccountData;
    formValues.biller={IBAN,billName,balance}
    if(formValues.biller.IBAN===formValues.recieverIban){
      alert("Не можеш да прехвърлиш към същата сметка")
      return
    }
    if(formValues.amount<=3){
      alert("Трябва да е повече от 3лв")
      return
    }
    if(formValues.biller.balance<formValues.amount){
      alert("Няма достатъчни средства в банковата сметка")
      return
    }
    if(formValues.reason.length==0){
      alert("Има нужда от основание")
      return
    }
    else{
    if (this.formEvent) {
      this.formEvent(formValues); // Call the parent handler with form data
    }
  }
  }
}
