import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink,FormsModule],
  providers:[userService],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  constructor(private userService: userService,private router:Router) {}
@ViewChild('registerForm') form:NgForm|undefined

    registerHandler(){
      console.log(this.form?.value)
      if(this.form?.value.password!==this.form?.value.rePassword){
        alert("Passwords do not match!")
        return
      }
      this.userService.addUsers(this.form?.value).subscribe(
        (response) => {
        console.log('User added successfully:', response);
        this.router.navigate(["/home"])
        this.form?.reset()
      },
      (error) => {
        console.error('Error adding user:', error);
        // Handle error, e.g., show an error message
      })
    }
}
