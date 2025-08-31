import { RouterModule, Routes } from '@angular/router';
import { OAuthCallbackComponent } from './pages/oauth';
import { RegisterComponent } from './pages/register';
import { LoginComponent } from './pages/login';
import { VerifyOtpComponent } from './pages/verify-otp.component';
import { DashboardComponent } from './pages/dashboard.component';
import { UploadComponent } from './pages/upload.component';
import { ForgotPasswordComponent } from './pages/forgot-password.component';
import { NgModule } from '@angular/core';
import { SensitivityComponent } from './pages/sensitivity.component';
import { SettingsComponent } from './pages/settings.component';
import { MyWalletComponent } from './pages/mywallet.component';
import { HistoryComponent } from './pages/history.component';
import { ForgotUsernameComponent } from './pages/find-username.component';
import { ConfirmPasswordComponent } from './pages/confirmpassword.component';
import { otpforpasswordreset } from './pages/otpforpasswordreset.component';
import { ReceivedFilesComponent } from './pages/receivedfiles.component';
import { SharedFilesComponent } from './pages/sharedfiles.component';
import { RegistrationVerifyOtpComponent } from './pages/registrationverify.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'oauth2/callback', component: OAuthCallbackComponent },
  { path: 'verify-otp', component: VerifyOtpComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'upload', component: UploadComponent },
   { path: 'forgot-password', component: ForgotPasswordComponent },
  {path:'settings',component:SettingsComponent},
   { path:'sensitivity/:id', component:SensitivityComponent },

   {path:'mywallet',component:MyWalletComponent},
   {path:'history',component:HistoryComponent},
   {path:'forgot-username',component:ForgotUsernameComponent},
   {path:'confirmpassword',component:ConfirmPasswordComponent},
   {path:'otpforpasswordreset',component:otpforpasswordreset},
   {path:'receivedfiles',component:ReceivedFilesComponent},
   {path:'sharedfiles',component:SharedFilesComponent},
   {path:'registrationverify',component:RegistrationVerifyOtpComponent},
  { path: '**', redirectTo: '' },
   
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }