import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { TasksComponent } from './tasks/tasks.component';
import { AuthGuard } from './services/auth.guard'
const routes: Routes = [
  { path: 'applyLeave', component: LeaveComponent,canActivate: [AuthGuard] },
  { path: 'allTask', component: TasksComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: '', redirectTo: 'allTask', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
  
})
export class AppRoutingModule { }
