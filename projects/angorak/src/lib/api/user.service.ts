import { Injectable } from '@angular/core';
import {
  IApiUserForgetParams,
  IApiUserLoginParams,
  IApiUserRegisterParams,
} from '../interfaces';
import { HttpService } from '../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpService) {}

  public Register(params: IApiUserRegisterParams) {
    return this.http.request({
      method: 'post',
      path: '/api/v1/user/register',
      data: params,
    });
  }

  public Login(params: IApiUserLoginParams) {
    return this.http.request({
      method: 'post',
      path: '/api/v1/user/login',
      data: params,
    });
  }

  public Forget(params: IApiUserForgetParams) {
    return this.http.request({
      method: 'post',
      path: '/api/v1/user/forget',
      data: params,
    });
  }

  public Me() {
    return this.http.request({
      method: 'get',
      path: '/api/v1/user',
      auth: true,
    });
  }
}
