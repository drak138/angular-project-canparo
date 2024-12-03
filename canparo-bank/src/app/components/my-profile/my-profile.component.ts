import { CardService } from './../../services/card.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink],
  providers:[userService,BillService,CardService],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent implements OnInit{

  userBills:any=0
  userCards:any=0
  userEmail:string=''
  userName:string=''

 constructor(private userService:userService,private router:Router,
  private billService:BillService,private cardService:CardService
 ){}

 ngOnInit(): void {
  this.billService.checkUserBills().subscribe((response)=>{
    this.userBills=response
    this.userBills=this.userBills.hasBills.length
  })
  this.cardService.getUserCards().subscribe((response)=>{
    this.userCards=response.length
  })
  const user=this.userService.getUsers()
  this.userEmail=user.email
  this.userName=user.name

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
