import { AdminComponent } from './admin/admin.component';
import { ClientComponent } from './client/client.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'client', component:ClientComponent},
  {path: 'admin', component:AdminComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
