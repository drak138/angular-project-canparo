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
import { AuthGuard } from './users.guard';
import { CreateUserBillComponent } from './components/create-user-bill/create-user-bill.component';
import { BillGuard } from './bills.guard';

export const routes: Routes = [{
    path:'',redirectTo:"auth/login",pathMatch:'full'},
    {path:'auth/login',component:LoginComponent,title:"Login Page",canActivate:[AuthGuard]},
    {path:'home',component:HomeComponent, title: "Home Page",canActivate:[AuthGuard]},
    {path:'auth/register',component:RegisterComponent, title: "Register Page",canActivate:[AuthGuard]},
    {path:'about',component:AboutComponent, title: "About Page"},
    {path:'about/partners',component:PartnersComponent, title: "Partners Page"},
    {path:'about/contacts',component:ContactsComponent, title: "Contacts Page"},
    {path:'card/balance',component:BalanceComponent,title:"My Balance",canActivate:[AuthGuard,BillGuard]},
    {path:'card',children:[
        {path:'myCards',component:CardsComponent,title:"Cards",canActivate:[AuthGuard,BillGuard]},
        {path:':id/details',component:CardDetailsComponent,title:"Details",canActivate:[AuthGuard,BillGuard]}
    ]
    },
    {path:'auth/changePass',component:ChangePassComponent,title:"Change Password",canActivate:[AuthGuard]},
    {path:'auth/myAccount',component:MyProfileComponent,title:"My Profile",canActivate:[AuthGuard]},
    {path:'card/bills',component:MyBillsComponent,title:"My Bills",canActivate:[AuthGuard,BillGuard]},
    {path:'card/createBill',component:CreateBillComponent,title:"Create Bill",canActivate:[AuthGuard,BillGuard]},
    {path:'card/createUserBill',component:CreateUserBillComponent,title:"Create Youre Bill",canActivate:[AuthGuard]},
    {path:'card/create',component:CreateCardComponent,title:"Create Card",canActivate:[AuthGuard,BillGuard]},
    {path:'card/transfer',component:TransferComponent,title:"Transfer Page",canActivate:[AuthGuard,BillGuard]},
    {path:'**',redirectTo:'/home'}
    

];
    
