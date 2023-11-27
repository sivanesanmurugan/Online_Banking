import { Component, OnInit } from '@angular/core';
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
  error: string = '';
  accountDetails: Account[] = [];
  constructor(private accountService: AccountDetialService,private stroageService:StorageService) {}
  appuser:AppUser=this.stroageService.getLoggedInUser();
  ngOnInit(): void {
    this.accountService.getAccountDetails().subscribe({
      next: (response: any) => {
        this.accountDetails = response.data;
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
