import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';
import { CommonModule } from '@angular/common';
import { ErrComponent } from '../err/err.component';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule,CommonModule,ErrComponent],
  providers:[userService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
errorMessage=""

ngOnInit(): void {
  this.userService.errorIn$.subscribe((errorIn)=>{
    this.errorMessage=errorIn
    setTimeout(() => {
      this.errorMessage = ""
    }, 1500);
  })
}

  constructor(private userService: userService,private router:Router) {}
@ViewChild('registerForm') form:NgForm|undefined

    registerHandler(){
      if(this.form?.value.password!==this.form?.value.rePassword){
        alert("Passwords do not match!")
        return
      }
      this.userService.addUsers(this.form?.value).subscribe(
        (response) => {
        if(!response.token){
          return
        }
        this.router.navigate(["/home"])
        this.form?.reset()
      },
      (error) => {
        console.error('Error adding user:', error);
        // Handle error, e.g., show an error message
      })
    }
}
