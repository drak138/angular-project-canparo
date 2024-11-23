import { Component } from '@angular/core';
import { RouterLink} from '@angular/router';

@Component({
  selector: 'header-component',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header-component.component.html'
})
export class HeaderComponent {
isLogged:boolean=true
}
