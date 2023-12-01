import { Component } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Account } from 'src/app/model/account';
import { AppResponse } from 'src/app/model/appResponse';
import { AccountApprovalService } from 'src/app/service/account-approval.service';

@Component({
  selector: 'app-account-approval',
  templateUrl: './account-approval.component.html',
  styleUrls: ['./account-approval.component.css'],
})
export class AccountApprovalComponent {
  options: AnimationOptions = {
    path: '/assets/nodata.json',
  };
  error: string = '';
  accountDetails: Account[] = [];

  constructor(private accountApprovalService: AccountApprovalService) {}

  ngOnInit(): void {
    this.accountApprovalService.getNotApprovalAccount().subscribe({
      next: (response: AppResponse) => {
        this.accountDetails = response.data;
        console.log(this.accountDetails);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  approval(id: number):void {
    this.accountApprovalService.putAccountApproval(id).subscribe({
      next: (response: AppResponse) => {
        console.log('donee');
        this.ngOnInit();
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
