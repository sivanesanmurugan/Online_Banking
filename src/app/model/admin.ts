import { Account } from './account';

export interface Admin {
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: number;
  accounts: Account[];
}
