export interface Account {
  id?: number;
  account_No: number;
  accountType?:string;
  ifsc_Code?: string;
  balance?: number;
  approval?:boolean;
}
