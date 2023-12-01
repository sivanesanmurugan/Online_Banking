import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from 'src/app/service/user.service';
import { UserProfile } from 'src/app/model/user-profile';
import { Account } from 'src/app/model/account';
import { AccountDetialService } from 'src/app/service/account-detial.service';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { Transaction } from 'src/app/model/transaction';
import { AppUser } from 'src/app/model/appUser';
import { AnimationOptions } from 'ngx-lottie';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
 
})
export class HomeComponent {
  options:AnimationOptions={
    path:'/assets/nodata.json'
  }
  showBalance: boolean = false;
  error: string = '';
  userProfile: UserProfile[] = [];
  accountDetails: Account[] = [];
  transactions: Transaction[] = [];
  selectedAccount: number = 0;
  investmentAccount:number=0;
  accountTy: string = '';
  accountType: number = 0;
  isActiveAccount: Account = {
    account_No: 0,
  };
  constructor(
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountDetialService,
    private storageService: StorageService,
    private transactionService: TransactionService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userService.getuserDetail().subscribe({
      next: (response: any) => {
        this.userProfile.push(response.data);
        console.log(this.userProfile);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
    this.accountService.getAccountDetails().subscribe({
      next: (response: any) => {
        this.accountDetails = response.data;
        console.log(this.accountDetails);
        
        this.accountTy = this.accountDetails[0].accountType!;
        this.transactionService
          .getUserTransaction(this.accountDetails[0].account_No)
          .subscribe({
            next: (response: any) => {
              this.transactions = response.data;
              console.log(this.transactions);
              //saving account_No
              this.selectedAccount = this.accountDetails[0].account_No;
              this.storageService.setSavingAccount(this.selectedAccount);
              if(this.accountDetails.length>=2){
                this.investmentAccount=this.accountDetails[1].account_No;
                this.storageService.setInvestmentAccount(this.investmentAccount);
              }
            },
            error: (err) => {
              console.log(err?.error?.error?.message);
            },
          });
      },
    });

    this.showBalance = true;
    setTimeout(() => {
      this.showBalance = false;
    }, 4000);
  }
  hideBalance(): void {
    this.showBalance = true;
    setTimeout(() => {
      this.showBalance = false;
    }, 4000);
  }
  isSavingAccount: boolean = true;
  toggleAccount(): void {
    if (this.accountDetails.length >= 2) {
      this.isSavingAccount = !this.isSavingAccount;
      let index = this.isSavingAccount ? 0 : 1;
      this.selectedAccount = this.accountDetails[index].account_No;
      this.accountTy = this.accountDetails[index].accountType!;
      this.storageService.setSavingAccount(this.selectedAccount);
    }
  }
  addAccount() {
    let user: AppUser = this.storageService.getLoggedInUser();
    let newAccount = {
      user_id: user.id,
      acc_type_id: this.accountType,
    };
    this.accountService.AddOtherAccount(newAccount).subscribe({
      next: (response: any) => {
        this.router.navigate([''], { replaceUrl: true });
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
  switchAccount(){
    if (this.accountDetails.length > 0) {
      this.selectedAccount = this.accountDetails[1].account_No;
      this.storageService.setSavingAccount(this.selectedAccount);
    }
  }

  logout(): void {
    this.authService.logout();
  }
}
