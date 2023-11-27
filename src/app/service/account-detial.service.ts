import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { AppUser } from '../model/appUser';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountDetialService {
  constructor(private http: HttpClient, private storageService:StorageService) {}

  getAccountDetails(): Observable<AppResponse> {
    let user: AppUser = this.storageService.getLoggedInUser();
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/account/${user.id}`);
  }
}
