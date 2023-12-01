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

  setSavingAccount(account: number) {
    localStorage.setItem('SavingAccount', JSON.stringify(account));
  }
  public getSavingAccount(): number {
    return JSON.parse(localStorage.getItem('SavingAccount') || '{}');
  }
  removeSavingAccount() {
    localStorage.removeItem('SavingAccount');
  }
  setInvestmentAccount(account: number) {
    localStorage.setItem('InvestmentAccount', JSON.stringify(account));
  }
  public getInvestmentAccount(): number {
    return JSON.parse(localStorage.getItem('InvestmentAccount') || '{}');
  }
  removeInvestmentAccount() {
    localStorage.removeItem('InvestmentAccount');
  }
  setCount(account: number) {
    localStorage.setItem('Count', JSON.stringify(account));
  }
  public getCount(): number {
    return JSON.parse(localStorage.getItem('Count') || '{}');
  }
  removeCount() {
    localStorage.removeItem('Count');
  }
  setNumberOfRegister(registerCount: number) {
    localStorage.setItem('registerCount', JSON.stringify(registerCount));
  }
  public getNumberOfRegister(): number {
    return JSON.parse(localStorage.getItem('registerCount') || '{}');
  }
  removeNumberOfRegister() {
    localStorage.removeItem('registerCount');
  }
  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem("route", route);
  }

  public getRoute(): string | null {
    return localStorage.getItem("route");
  }

  public removeRoute(): void {
    localStorage.removeItem("route");
  }
}
