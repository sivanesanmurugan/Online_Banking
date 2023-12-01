import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/model/transaction';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-self-transfer',
  templateUrl: './self-transfer.component.html',
  styleUrls: ['./self-transfer.component.css'],
})
export class SelfTransferComponent {
  error: string = '';
  transactionType: number = 1;
  sourceAccount: number = this.storageService.getSavingAccount();
  targetAccount: number = 0;
  amount: number = 0;
  transactionStatus:number=1;
  transfer: Transaction[] = [];
  constructor(private transactionService: TransactionService,private storageService:StorageService,private router: Router) {}
  fundtransfer(){
  let newTransaction:Transaction={
    sourceAccount: this.sourceAccount,
    targetAccount: this.targetAccount!,
    transactionType: this.transactionType,
    transactionStatus: this.transactionStatus,
    amount: this.amount,
  }
  this.transactionService.postTransfer(newTransaction).subscribe({
    next: (response: any) => {
      this.transfer = response.data;
      this.sourceAccount=0;
      this.targetAccount=0;
      this.amount=0; 
      this.router.navigate(['/fundtransfer'], { replaceUrl: true });
    },
    error: (err) => {
      console.log(err?.error?.error?.message);
    },
  })
  }
  updateReceiverAccount(): void {
    if (this.transactionType === 1) {
      this.targetAccount = this.sourceAccount;
    } 
  }
}
