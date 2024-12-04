import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule,NgForm } from '@angular/forms';
import { BillService } from '../../services/bill.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user-bill',
  standalone: true,
  imports: [CommonModule,FormsModule],
  providers:[BillService],
  templateUrl: './create-user-bill.component.html',
  styleUrl: './create-user-bill.component.css'
})
export class CreateUserBillComponent {
  cardChoice: boolean = false;

  @ViewChild('createBill') form:NgForm|undefined
  constructor(private billService:BillService,private router:Router){}

  createUserBill(){
    if(this.form?.value.balance<=50){
      alert("Пъровначален Баланс трябва да е над 50")
      return
    }
    else{
      this.billService.createUserBill(this.form?.value).subscribe(
        (Response)=>{
          if(this.cardChoice){
            this.router.navigate(["/card/create"])
          }else{
            this.router.navigate(["/home"])
          }
        },
      (error) => {
      }
      )
    }
  }

}
