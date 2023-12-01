import { Component, OnInit } from '@angular/core';
import { Admin } from 'src/app/model/admin';
import { AppUser } from 'src/app/model/appUser';
import { UserDetail } from 'src/app/model/user-detail';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  error: string = "";
  userDetails: Admin[]= [];
  totalUser:number=0;

  constructor(private userService: UserService,private storageService:StorageService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: Admin[]  = response.data;
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
        }
        this.storageService.setSavingAccount(userDetails.length);
       console.log(userDetails);
       
      },
      
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
 
}
