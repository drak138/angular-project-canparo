import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink],
  providers:[userService,BillService],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  userBills:any=0

 constructor(private userService:userService,private router:Router,private billService:BillService){}

 ngOnInit(): void {
  this.billService.checkUserBills().subscribe((response)=>{
    this.userBills=response
    this.userBills=this.userBills.hasBills.length
  })
 }

  logOutHandler(){
    this.userService.logout()
    this.router.navigate(["auth/login"])
  }
  showDelete(){
    const userResponse = confirm("Do you want to proceed?");
    if (userResponse) {
      this.userService.deleteUser().subscribe((response) => {
        this.router.navigate(["auth/login"])
      },
      (error) => {
        console.log(error)
      })
    } else {
    }
  }
}
