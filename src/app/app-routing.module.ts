import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { AccountApprovalComponent } from './component/admin/account-approval/account-approval.component';
import { ReportsComponent } from './component/admin/reports/reports.component';
import { TransationHistoryComponent } from './component/transaction-history/transation-history.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { FundTransferComponent } from './component/fundTransfer/fund-transfer/fund-transfer.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { SelfTransferComponent } from './component/fundTransfer/self-transfer/self-transfer.component';
import { SameBankTransferComponent } from './component/fundTransfer/same-bank-transfer/same-bank-transfer.component';
import { OtherBankTransferComponent } from './component/fundTransfer/other-bank-transfer/other-bank-transfer.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '', component: HomeComponent, canActivate: [authGuard] },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {path:'userdetail',component:UserDetailsComponent, canActivate: [authGuard]},
  {path:'accountapproval',component:AccountApprovalComponent,canActivate:[authGuard]},
  {path:'reports',component:ReportsComponent,canActivate:[authGuard]},
  {path:'transationhistory',component:TransationHistoryComponent,canActivate:[authGuard]},
  {path:'userprofile',component:UserprofileComponent,canActivate:[authGuard]},
  {path:'fundtransfer',component:FundTransferComponent,canActivate:[authGuard]},
  {path:'accountdetail',component:AccountDetailComponent,canActivate:[authGuard]},
  {path:'self',component:SelfTransferComponent,canActivate:[authGuard]},
  {path:'samebank',component:SameBankTransferComponent,canActivate:[authGuard]},
  {path:'otherbank',component:OtherBankTransferComponent,canActivate:[authGuard]},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
