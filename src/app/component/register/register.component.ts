import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  constructor(private router: Router,private authservice: AuthService) {}
  Register: Register[] = [];
  firstname: string = '';
  lastname: string = '';
  email: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  state: string = '';
  zipcode: number = 0;
  username: string = '';
  password: string = '';
  accountType: number=0;
  register(): void {
    const userdetails: Register = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      phone: this.phone,
      address: this.address,
      city: this.city,
      state: this.state,
      zipcode: this.zipcode,
      username: this.username,
      password: this.password,
      acc_type_id: this.accountType
    };
    this.authservice.register(userdetails).subscribe({
      next: (response) => {
        this.Register = response.data;
      },
    });
    // Redirect to login page
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
