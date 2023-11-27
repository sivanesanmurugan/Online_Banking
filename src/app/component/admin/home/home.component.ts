import { Component } from '@angular/core';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  error: string = '';
  transactions: Transaction[] = [];
  constructor(private transactionService: TransactionService) {}

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
  }
}
