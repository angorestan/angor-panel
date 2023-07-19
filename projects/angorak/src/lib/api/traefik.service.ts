import { Injectable } from '@angular/core';
import { IApiTraefikRouteCreateParams } from '../interfaces';
import { HttpService } from '../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class TraefikService {
  constructor(private http: HttpService) {}

  public List() {
    return this.http.request({
      method: 'get',
      path: '/api/v1/traefik/route/list',
      auth: true,
    });
  }

  public Create(params: IApiTraefikRouteCreateParams) {
    return this.http.request({
      method: 'post',
      path: '/api/v1/traefik/route',
      data: params,
      auth: true,
    });
  }


  public Exists(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/traefik/route/one/exist/${key.replace(' ', '-')}`,
      auth: true,
    });
  }

  public Edit(params: IApiTraefikRouteCreateParams) {
    return this.http.request({
      method: 'put',
      path: `/api/v1/traefik/route/one/${params.name}`,
      data: params,
      auth: true,
    });
  }

  public Delete(name: string) {
    return this.http.request({
      method: 'delete',
      path: `/api/v1/traefik/route/one/${name}`,
      auth: true,
    });
  }
}
