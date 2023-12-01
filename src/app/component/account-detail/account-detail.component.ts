import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Account } from 'src/app/model/account';
import { AppUser } from 'src/app/model/appUser';
import { AccountDetialService } from 'src/app/service/account-detial.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css'],
})
export class AccountDetailComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  error: string = '';
  accountDetails: Account[] = [];
  constructor(private accountService: AccountDetialService,private storageService:StorageService) {}
  appuser:AppUser=this.storageService.getLoggedInUser();
  ngOnInit(): void {
    let userAcc:number=this.storageService.getSavingAccount();
    this.accountService.getAccountDetail(userAcc).subscribe({
      next: (response: any) => {
        this.accountDetails.push(response.data);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
