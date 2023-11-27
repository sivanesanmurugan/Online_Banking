import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AppResponse } from 'src/app/model/appResponse';
import { AppUser } from 'src/app/model/appUser';
import { UserDetail } from 'src/app/model/user-detail';
import { UserProfile } from 'src/app/model/user-profile';
import { StorageService } from 'src/app/service/storage.service';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css'],
})
export class UserprofileComponent {
  error: string = '';
  userProfile: UserProfile[] = [];
  firstname: string = '';
  lastname: string = '';
  zipcode: number = 0;
  email: string = '';
  phoneNumber: string = '';
  address1: string = '';
  city: string = '';
  state: string = '';
  id: number = 0;

  constructor(
    private userService: UserService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.userService.getuserDetail().subscribe({
      next: (response: any) => {
        // this.userProfile = response.data;
        this.userProfile.push(response.data);
      },
      error: (err) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  update() {
    for (let user of this.userProfile) {
      this.id = user.id;
      this.firstname = user.firstName;
      this.lastname = user.lastName;
      this.zipcode = user.zipcode;
      this.email = user.email;
      this.phoneNumber = user.phone;
      this.address1 = user.address;
      this.city = user.city;
      this.state = user.state;
    }
  }
  edit() {
    let user: AppUser = this.storageService.getLoggedInUser();
    let newUser: UserProfile = {
      id: this.id,
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phoneNumber,
      address: this.address1,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      user_Id: user.id,
    };
    this.userService.postUserDetails(newUser).subscribe({
      next: (response: AppResponse) => {
        this.userProfile = [];
        this.userProfile.push(response.data);
        this.firstname = '';
        this.lastname = '';
        this.zipcode = 0;
        this.email = '';
        this.phoneNumber = '';
        this.address1 = '';
        this.city = '';
        this.state = '';
      },
      error: (err) => {
        console.log(err?.error?.error?.message);
      },
    });
  }
}
