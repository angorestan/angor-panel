import { Injectable } from '@angular/core';
import { HttpService } from '../utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class Pm2Service {
  constructor(private http: HttpService) {}

  public List() {
    return this.http.request({
      method: 'get',
      path: '/api/v1/pm2/list',
    });
  }


  public Start(name: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/pm2/${name.replace(' ', '-')}/start`,
      auth: true,
    });
  }

  public Stop(name: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/pm2/${name.replace(' ', '-')}/stop`,
      auth: true,
    });
  }

  public Restart(name: string) {
    return this.http.request({
      method: 'post',
      path: `/api/v1/pm2/${name.replace(' ', '-')}/restart`,
      auth: true,
    });
  }

}
