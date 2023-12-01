import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { AccountDetialService } from './service/account-detial.service';
import { Account } from './model/account';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isUser:boolean=false;
  isLoggedIn: boolean = false;
  isApproval: boolean=false;
  accountDetails: Account[] = [];
  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,private accountService:AccountDetialService
  ) {}

  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isUser$.subscribe((isUser) => {
      this.isUser = isUser;
    });

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
    this.accountService.getAccountDetails().subscribe({
      next: (response: any) => {
        this.accountDetails = response.data;
        this.isApproval=this.accountDetails[0].approval!;
      },
    })

  }

  logout(): void {
   
    this.authService.logout();
   
  }
}
