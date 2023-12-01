import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { AppUser } from '../model/appUser';
import { StorageService } from './storage.service';
import { UserProfile } from '../model/user-profile';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient,private storageService:StorageService) {}

  getUserDetails(): Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/allUsers`);
  }
  getuserDetail(): Observable<AppResponse>{
    let user: AppUser = this.storageService.getLoggedInUser();
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/user/showDetails/`+user.id);
  }
  postUserDetails(user:UserProfile): Observable<AppResponse>{
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/user/showDetails`,user);
  }
  getCount() : Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/allUsers/count`);
  }
}
