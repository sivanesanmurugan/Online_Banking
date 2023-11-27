import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { Account } from '../model/account';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  setAuthData(authData: string) {
    localStorage.setItem('authData', authData);
  }

  public getAuthData(): string | null {
    console.log(localStorage.getItem('authData'));

    return localStorage.getItem('authData');
  }

  removeAuthData() {
    localStorage.removeItem('authData');
  }

  setAccount(account: Account) {
    localStorage.setItem('Account', JSON.stringify(account));
  }
  public getAccount(): Account {
    return JSON.parse(localStorage.getItem('Account') || '{}');
  }
  removeAccount() {
    localStorage.removeItem('Account');
  }
}
