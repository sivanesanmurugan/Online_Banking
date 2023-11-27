import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class AccountApprovalService {
  constructor(private http:HttpClient) { }
  getNotApprovalAccount() {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/account/notApproval`);
  }
  putAccountApproval(id:number){
    console.log(id+"hello");
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/account/approval/${id}`,null);
  }
}
