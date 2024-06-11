import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { LeaveComponent } from './leave/leave.component';
import { TasksComponent } from './tasks/tasks.component';
import { TaskComponent } from './task/task/task.component';
import { DgpcFormComponent } from './task/dgpc-form/dgpc-form.component';
import { GuideFormComponent } from './task/guide-form/guide-form.component';
import { HodFormComponent } from './task/hod-form/hod-form.component';
import { ApplicantComponent } from './task/applicant/applicant.component';
import { AuthGuard } from './services/auth.guard'
const routes: Routes = [
  { path: 'applyLeave', component: LeaveComponent,canActivate: [AuthGuard] },
  { path: 'allTask', component: TasksComponent,canActivate: [AuthGuard] },
  { path: 'task/:id', component: TaskComponent,canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent,canActivate: [AuthGuard] },
  { path: 'guideApproval/:id', component: GuideFormComponent,canActivate: [AuthGuard] },
  { path: 'dgpcApproval/:id', component: DgpcFormComponent,canActivate: [AuthGuard] },
  { path: 'hodApproval/:id', component: HodFormComponent,canActivate: [AuthGuard] },
  { path: 'applicantForm/:id', component: ApplicantComponent,canActivate: [AuthGuard] },
   

  { path: '', redirectTo: 'allTask', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
  
})
export class AppRoutingModule { }
