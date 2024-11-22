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
import { ChangePassComponent } from './components/change-pass/change-pass.component';
import { MyProfileComponent } from './components/my-profile/my-profile.component';
import { CreateBillComponent } from './components/create-bill/create-bill.component';
import { MyBillsComponent } from './components/my-bills/my-bills.component';
import { CreateCardComponent } from './components/create-card/create-card.component';
import { TransferComponent } from './components/transfer/transfer.component';

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
        {path:'myCards',component:CardsComponent,title:"Cards"},
        {path:':id/details',component:CardDetailsComponent,title:"Details"}
    ]
    },
    {path:'auth/changePass',component:ChangePassComponent,title:"Change Password"},
    {path:'auth/myAccount',component:MyProfileComponent,title:"My Profile"},
    {path:'card/bills',component:MyBillsComponent,title:"My Bills"},
    {path:'card/createBill',component:CreateBillComponent,title:"Create Bill"},
    {path:'card/create',component:CreateCardComponent,title:"Create Card"},
    {path:'card/transfer',component:TransferComponent,title:"Transfer Page"}

];
    
