import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Transaction } from 'src/app/model/transaction';
import { StorageService } from 'src/app/service/storage.service';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-other-bank-transfer',
  templateUrl: './other-bank-transfer.component.html',
  styleUrls: ['./other-bank-transfer.component.css'],
})
export class OtherBankTransferComponent {
  error: string = '';
  transactionType: number = 3;
  sourceAccount=this.storageService.getSavingAccount();
  targetAccount: number |null = null;
  amount: number |null = null;
  transactionStatus: number = 1;
  transfer: Transaction[] = [];
  name: string = '';
  IFSC: string = '';
  constructor(private transactionService: TransactionService,private storageService:StorageService,private router: Router) {}
  fundtransfer() {
    let newTransaction: Transaction = {
      sourceAccount: this.sourceAccount,
      targetAccount: this.targetAccount!,
      transactionType: this.transactionType,
      transactionStatus: this.transactionStatus,
      amount: this.amount!,
    };
    this.transactionService.postOtherBankTransfer(newTransaction).subscribe({
      next: (response: any) => {
        this.transfer = response.data;
        this.sourceAccount = this.storageService.getSavingAccount();
        this.targetAccount = null;
        this.amount = null;
        this.name = '';
        this.IFSC = '';
        this.router.navigate(['/fundtransfer'], { replaceUrl: true });
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
