import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Account } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { AccountDetialService } from 'src/app/service/account-detial.service';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-same-bank-transfer',
  templateUrl: './same-bank-transfer.component.html',
  styleUrls: ['./same-bank-transfer.component.css'],
})
export class SameBankTransferComponent implements OnInit {
  error: String = '';
  transactionType: number = 2;
  sourceAccount = this.storageService.getSavingAccount();
  targetAccount: number = 0;
  amount: number = 0;
  transactionStatus: number = 1;
  transfer: Transaction[] = [];
  accounts: Account[] = [];
  constructor(
    private transactionService: TransactionService,
    private accountervice: AccountDetialService,
    private storageService: StorageService,
    private router: Router
  ) {}
  fundtransfer() {
    let newTransaction: Transaction = {
      sourceAccount: this.sourceAccount,
      targetAccount: this.targetAccount,
      transactionType: this.transactionType,
      transactionStatus: this.transactionStatus,
      amount: this.amount,
    };
 console.log(this.targetAccount);
 
    this.transactionService.postSameBankTransfer(newTransaction).subscribe({
      next: (response: any) => {
        this.transfer = response.data;
        this.sourceAccount = 0;
        this.targetAccount = 0;
        this.amount = 0;
        this.router.navigate(['/fundtransfer'], { replaceUrl: true });
      },
      error: (err) => {
        let message: String = err.message;
        console.log(message);
        
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  ngOnInit(): void {
    this.accountervice.getOtherAccountNumber().subscribe({
      next: (response: any) => {
        this.accounts = response.data;
      },
    });
  }
}
