import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { Observable } from 'rxjs';
import { urlEndpoint } from '../utils/constant';
import { Transaction } from '../model/transaction';

@Injectable({
  providedIn: 'root',
})
export class TransactionService {
  constructor(private http: HttpClient) {}

  getAllTransactions(): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/admin/account/transaction`
    );
  }
  getUserTransaction(id: number): Observable<AppResponse> {
    return this.http.get<AppResponse>(
      `${urlEndpoint.baseUrl}/user/transaction/${id}`
    );
  }
  postTransfer(transfer: Transaction) {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/transaction/self`,
      transfer
    );
  }
  postSameBankTransfer(transfer: Transaction) {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/transaction/sameBank`,
      transfer
    );
  }
  postOtherBankTransfer(newTransaction: Transaction) {
    return this.http.post<AppResponse>(
      `${urlEndpoint.baseUrl}/user/transaction/otherBank`,
      newTransaction
    );
  }
}
