import { Component } from '@angular/core';
import { Account } from 'src/app/model/account';
import { AppUser } from 'src/app/model/appUser';
import { Transaction } from 'src/app/model/transaction';
import { AccountDetialService } from 'src/app/service/account-detial.service';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-transation-history',
  templateUrl: './transation-history.component.html',
  styleUrls: ['./transation-history.component.css'],
})
export class TransationHistoryComponent {
  error: string = '';
  userTransaction: Transaction[] = [];
  userAccount :Account[]=[];
  userAccountNo:number=0;
  constructor(
    private transactionService: TransactionService,
    private storageService: StorageService,private accountService:AccountDetialService
  ) {}

  ngOnInit(): void {
    this.accountService.getAccountDetails().subscribe({
      next: (response: any) => {
        this.userAccount = response.data;
        this.userAccountNo = this.userAccount[0].account_No;
        this.transactionService.getUserTransaction(this.userAccountNo).subscribe({
          next: (response: any) => {
            console.log("hes");
            
            this.userTransaction = response.data;
            console.log(this.userTransaction);
          },
          error: (err) => {
            console.log(err?.error?.error?.message);
          },
        });
      },
    })
    console.log(this.userAccountNo);
   
  }
}
