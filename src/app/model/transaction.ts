export interface Transaction {
  id?: number;
  amount: number;
  sourceAccount: number;
  targetAccount: number;
  transactionType: number;
  transactionStatus: number;
  localDateTime?: string;
}
