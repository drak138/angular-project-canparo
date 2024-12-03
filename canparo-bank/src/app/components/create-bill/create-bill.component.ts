import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';
import { BillService } from '../../services/bill.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';
import { ErrComponent } from '../err/err.component';

@Component({
  selector: 'app-create-bill',
  standalone: true,
  imports: [CommonModule,TransferFormComponent,FormsModule,ErrComponent],
  providers:[BillService],
  templateUrl: './create-bill.component.html',
  styleUrl: './create-bill.component.css'
})
export class CreateBillComponent {
  errorMessage: string=""
  btn={
    text:'Създай Сметка',
    class:"create-bill-btn"
  }

  constructor(private billService:BillService,private router:Router){
    this.createBillHandler = this.createBillHandler.bind(this);
  }

  createBillHandler(formValues: any): void {
    console.log(this)
    this.billService.createMonthlyBill(formValues).subscribe(
      (response)=>{
      this.errorMessage = ''; // Clear any existing error
      this.router.navigate(["/home"])
    },(error)=>{
      this.errorMessage = error || 'Failed to change password.';
      setTimeout(() => {
        this.errorMessage = ""
      }, 1500);
    })
  }
}
