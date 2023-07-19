import { Injectable } from '@angular/core';
import { IApiDockerContainerCreateParams } from '../interfaces/api.docker';
import { HttpService } from '../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class DockerContainerService {
  constructor(private http: HttpService) {}

  public List() {
    return this.http.request({
      method: 'get',
      path: '/api/v1/docker/container/list',
      auth: true,
    });
  }

  public Exists(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/container/one/exist/${key.replace(' ', '-')}`,
      auth: true,
    });
  }

  public Create(params: IApiDockerContainerCreateParams) {
    return this.http.request({
      method: 'post',
      path: '/api/v1/docker/container',
      data: params,
      auth: true,
    });
  }

  public Start(key: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}/start`,
      auth: true,
    });
  }

  public Stop(key: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}/stop`,
      auth: true,
    });
  }

  public Restart(key: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}/restart`,
      auth: true,
    });
  }

  public Stats(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}/stats`,
      auth: true,
    });
  }

  public Logs(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}/logs`,
      auth: true,
    });
  }

  public One(key: string) {
    return this.http.request({
      method: 'get',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}`,
      auth: true,
    });
  }
  

  public Delete(key: string) {
    return this.http.request({
      method: 'delete',
      path: `/api/v1/docker/container/one/${key.replace(' ', '-')}`,
      auth: true,
    });
  }
  
}
