import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [{
    path:'',component:RegisterComponent,title:"Register Page"},
    {path:"home",component:HomeComponent, title: "Home Page"}];
