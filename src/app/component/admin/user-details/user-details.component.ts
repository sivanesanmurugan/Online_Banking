import { Component, OnInit } from '@angular/core';
import { UserDetail } from 'src/app/model/user-detail';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  error: string = "";
  userDetails: UserDetail[] = [];


  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserDetails().subscribe({
      next: (response: any) => {
        let userDetails: UserDetail[] = response.data;
        console.log(userDetails);
        
        if (userDetails.length > 0) {
          this.userDetails = userDetails;
        }
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
}
