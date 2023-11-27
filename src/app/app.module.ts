import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { AccountApprovalComponent } from './component/admin/account-approval/account-approval.component';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { ReportsComponent } from './component/admin/reports/reports.component';
import { TransationHistoryComponent } from './component/transaction-history/transation-history.component';
import { UserprofileComponent } from './component/userprofile/userprofile.component';
import { FundTransferComponent } from './component/fundTransfer/fund-transfer/fund-transfer.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { SelfTransferComponent } from './component/fundTransfer/self-transfer/self-transfer.component';
import { SameBankTransferComponent } from './component/fundTransfer/same-bank-transfer/same-bank-transfer.component';
import { OtherBankTransferComponent } from './component/fundTransfer/other-bank-transfer/other-bank-transfer.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    AccountApprovalComponent,
    UserDetailsComponent,
    ReportsComponent,
    TransationHistoryComponent,
    UserprofileComponent,
    FundTransferComponent,
    AccountDetailComponent,
    SelfTransferComponent,
    SameBankTransferComponent,
    OtherBankTransferComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
