import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { PartnersComponent } from './components/partners/partners.component';
import { BalanceComponent } from './components/balance/balance.component';
import { ContactsComponent } from './components/contacts/contacts.component';
import { CardsComponent } from './components/cards/cards.component';
import { CardDetailsComponent } from './components/card-details/card-details.component';

export const routes: Routes = [{
    path:'',component:LoginComponent,title:"Login Page"},
    {path:'auth/login',component:LoginComponent,title:"Login Page"},
    {path:'home',component:HomeComponent, title: "Home Page"},
    {path:'auth/register',component:RegisterComponent, title: "Register Page"},
    {path:'about',component:AboutComponent, title: "About Page"},
    {path:'about/partners',component:PartnersComponent, title: "Partners Page",},
    {path:'about/contacts',component:ContactsComponent, title: "Contacts Page",},
    {path:'card/balance',component:BalanceComponent,title:"My Balance"},
    {path:'card',children:[
        {path:'myCards',component:CardsComponent},
        {path:':id/details',component:CardDetailsComponent}
    ]
}

];
    
