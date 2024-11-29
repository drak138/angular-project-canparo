import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { TransferFormComponent } from '../transfer-form/transfer-form.component';
import { FormsModule, NgForm } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { ErrComponent } from '../err/err.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-transfer',
  standalone: true,
  imports: [CommonModule,TransferFormComponent,FormsModule,ErrComponent],
  providers:[BillService],
  templateUrl: './transfer.component.html',
  styleUrl: './transfer.component.css'
})
export class TransferComponent {
    errorMessage: string=""
  formClass='transfer-form'
  btn={
    text:'Изпращане на превода',
    class:"send-transfer"
  }
  constructor(private billService:BillService,private router:Router){
    this.transferHandler = this.transferHandler.bind(this);
  }

  @ViewChild('transferForm')form:NgForm|undefined
  transferHandler(formValues: any): void {
    console.log(formValues)
    this.billService.transfer(formValues).subscribe(
      (response)=>{
      console.log(response)
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
