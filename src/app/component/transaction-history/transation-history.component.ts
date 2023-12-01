import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
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
  options:AnimationOptions={
    path:'/assets/nodata.json'
  }
  error: string = '';
  userTransaction: Transaction[] = [];
  userAccount :Account[]=[];
  userAccountNo:number=0;

  constructor(
    private transactionService: TransactionService,
    private storageService: StorageService,private accountService:AccountDetialService
  ) {}

  ngOnInit(): void {
     this.userAccountNo=this.storageService.getSavingAccount();
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

    console.log(this.userAccountNo);
   
  }
}
