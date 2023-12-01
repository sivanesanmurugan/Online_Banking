import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AnimationOptions } from 'ngx-lottie';
import { Register } from 'src/app/model/register';
import { AuthService } from 'src/app/service/auth.service';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
})
export class RegisterComponent {
  options: AnimationOptions = {
    path: '/assets/auth.json',
  };
  constructor(private router: Router,private authservice: AuthService ,private toastr: ToastrService) {}
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
      firstName: this.firstname.charAt(0).toUpperCase()+this.firstname.slice(1),
      lastName: this.lastname.toUpperCase(),
      email: this.email,
      phone: this.phone,
      address: this.address.charAt(0).toUpperCase() + this.address.slice(1),
      city: this.city.charAt(0).toUpperCase()+this.city.slice(1),
      state: this.state.toUpperCase(),
      zipcode: this.zipcode,
      username: this.username,
      password: this.password,
      acc_type_id: this.accountType
    };
    this.authservice.register(userdetails).subscribe({
      next: (response) => {
        this.Register = response.data;
        this.toastr.success(" Registered successfully")
      },
    });
    // Redirect to login page
    this.router.navigate(['/login'], { replaceUrl: true });
  }
}
