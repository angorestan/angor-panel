import { Injectable } from '@angular/core';
import qs from 'qs';
import { IApiDockerImageListParams } from '../interfaces/api.docker';
import { HttpService } from '../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class DockerImageService {
  constructor(private http: HttpService) {}

  public List(params?: IApiDockerImageListParams) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/image/list?${qs.stringify(params ?? {})}`,
      auth: true
    });
  }

  public One(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/image/one/${key}`,
      auth: true
    });
  }

  public Delete(key: string) {
    return this.http.request({
      method: 'delete',
      path: `/api/v1/docker/image/one/${key}`,
      auth: true
    });
  }

  public Create(params: any) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/docker/image`,
      auth: true,
      data: params
    });
  }

  public Update(key: string, params: any) {
    return this.http.request({
      method: 'put',
      path: `/api/v1/docker/image/one/${key}`,
      auth: true,
      data: params
    });
  }
}
