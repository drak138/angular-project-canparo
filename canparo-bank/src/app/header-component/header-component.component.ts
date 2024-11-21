import { Component } from '@angular/core';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [],
  templateUrl: './header-component.component.html'
})
export class HeaderComponent {
isLogged:boolean=true
}
