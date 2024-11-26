import { Component, OnInit } from '@angular/core';
import { RouterLink} from '@angular/router';
import { userService } from '../../services/user.service';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-component.component.html'
})
export class HeaderComponent implements OnInit{

  isLoggedIn: boolean = false;

  constructor(private userService: userService) {}

  ngOnInit(): void {
    this.userService.loggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }
}
