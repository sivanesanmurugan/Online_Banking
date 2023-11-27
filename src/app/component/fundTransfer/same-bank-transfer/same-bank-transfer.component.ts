import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-same-bank-transfer',
  templateUrl: './same-bank-transfer.component.html',
  styleUrls: ['./same-bank-transfer.component.css']
})
export class SameBankTransferComponent {
  error: string = '';
  transactionType: number = 2;
  sourceAccount: number = 0;
  targetAccount: number = 0;
  amount: number = 0;
  transactionStatus:number=1;
  transfer: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}
  fundtransfer(){
  let newTransaction:Transaction={
    sourceAccount: this.sourceAccount,
    targetAccount: this.targetAccount,
    transactionType: this.transactionType,
    transactionStatus: this.transactionStatus,
    amount: this.amount,
  }
  this.transactionService.postSameBankTransfer(newTransaction).subscribe({
    next: (response: any) => {
      this.transfer = response.data;
      this.sourceAccount=0;
      this.targetAccount=0;
      this.amount=0; 
    },
    error: (err) => {
      console.log(err?.error?.error?.message);
    },
  })
  }
}
