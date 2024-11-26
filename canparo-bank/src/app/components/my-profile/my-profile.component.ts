import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { userService } from '../../services/user.service';

@Component({
  selector: 'app-my-profile',
  standalone: true,
  imports: [RouterLink],
  providers:[userService],
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.css'
})
export class MyProfileComponent {
 constructor(private userService:userService,private router:Router){}
  logOutHandler(){
    this.userService.logout()
    this.router.navigate(["auth/login"])
  }
}
