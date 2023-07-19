export interface IApiUser {
  id: number;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  phone: string;
  permission: string;
}

export interface IApiUserRegisterParams {
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  password: string;
}

export interface IApiUserLoginParams {
  username: string;
  password: string;
}

export interface IApiUserForgetParams {
  email: string;
}
