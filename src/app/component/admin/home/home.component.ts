import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Account } from 'src/app/model/account';
import { AppUser } from 'src/app/model/appUser';
import { Transaction } from 'src/app/model/transaction';
import { AccountApprovalService } from 'src/app/service/account-approval.service';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  options: AnimationOptions = {
    path: '/assets/nodata.json',
  };
  error: string = '';
  transactions: Transaction[] = [];
  userDetails: AppUser[] = [];
  registerUser: Account[] = [];
  NumberOfUser: number = 0;
  totalBalance: number = 0;
  constructor(
    private transactionService: TransactionService,
    private userService: UserService,
    private accountApprovalService: AccountApprovalService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (response: any) => {
        this.transactions = response.data;
        console.log(this.transactions);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: AppUser[] = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
        }
        this.storageService.setSavingAccount(userDetails.length);
        this.totalBalance = userDetails
          .flatMap((user) => user.accounts || [])
          .reduce((acc, account) => acc + (account.balance || 0), 0);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
    this.accountApprovalService.getNotApprovalAccount().subscribe({
      next: (response: any) => {
        let registerUser: Account[] = response.data;
        if (registerUser.length > 0) {
          this.registerUser = registerUser;
        }
        this.storageService.setNumberOfRegister(registerUser.length);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
