import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { AuthService } from 'src/app/service/auth.service';
import { LoaderService } from 'src/app/service/loader.service';
import { UserService } from 'src/app/service/user.service';
import { UserProfile } from 'src/app/model/user-profile';
import { Account } from 'src/app/model/account';
import { AccountDetialService } from 'src/app/service/account-detial.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {
  showBalance: boolean = false;
  error: string = '';
  userProfile: UserProfile[] = [];
  accountDetails: Account[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private accountService: AccountDetialService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userService.getuserDetail().subscribe({
      next: (response: any) => {
        this.userProfile.push(response.data);
        console.log(this.userProfile);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
    this.accountService.getAccountDetails().subscribe({
      next: (response: any) => {
        this.accountDetails = response.data;
        let userAccount:Account=response.data
        this.storageService.setAccount(userAccount);
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
    this.showBalance = true;
    setTimeout(() => {
      this.showBalance = false;
    }, 4000);
 
  }
  hideBalance():void{
    this.showBalance = true;
    setTimeout(() => {
      this.showBalance = false;
    }, 4000);
  }
  logout(): void {
    this.authService.logout();
  }
}
