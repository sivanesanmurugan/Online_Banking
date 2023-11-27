export interface Account {
  id: number;
  account_No: number;
  accountType?:string;
  ifsc_code: string;
  balance: number;
}
