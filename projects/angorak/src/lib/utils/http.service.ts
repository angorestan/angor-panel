import { HttpClient, HttpHeaders, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  public token?: string;
  public endpoint: string = 'https://api.angor.nroot.ir';

  private storage_key = '#angorak/token';

  constructor(private http: HttpClient) {
    (window as any).setEndpoint = (value: string) => this.endpoint = value;
  }

  public unsetToken() {
    window.localStorage.removeItem(this.storage_key);
    this.token = undefined;
  }

  public setTokenFromStorage() {
    this.token = this.getTokenFromStorage()!;
  }

  public getTokenFromStorage() {
    return window.localStorage.getItem(this.storage_key);
  }

  public setAndSaveTokenInStorage(token: string) {
    this.token = token;
    window.localStorage.setItem(this.storage_key, token);
  }

  public request<T = any>(param: RequestParam) {
    let url = param.url ?? `${param.endpoint ?? this.endpoint}${param.path}`;

    let headers: any = param.header ?? { 'content-type': 'application/json' };

    if (param.auth != false && this.token) {
      headers['authorization'] = `Bearer ${this.token}`;
    }

    return this.http
      .request<T>(
        new HttpRequest(param.method, url, param.data, {
          responseType: 'json',
          reportProgress: param.reportProgress ?? false,
          headers: new HttpHeaders(headers),
        })
      )
      .pipe(
        map<any, T | undefined>((res) => {
          if (param.reportProgress) return res;
          if ('type' in res && res.type == 0) return undefined;
          else return res.body;
        }),
        filter((res) => res != undefined)
      );
  }
}

interface RequestParam {
  method: string;
  path?: string;
  data?: any;
  auth?: boolean;
  endpoint?: string;
  url?: string;
  header?: object;
  reportProgress?: boolean;
}
