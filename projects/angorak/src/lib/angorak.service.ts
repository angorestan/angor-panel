import { Injectable } from '@angular/core';
import { DockerContainerService } from './api/docker-container.service';
import { DockerImageService } from './api/docker-image.service';
import { Pm2Service } from './api/pm2.service';
import { TraefikService } from './api/traefik.service';
import { UserService } from './api/user.service';
import { HttpService } from './utils/http.service';

@Injectable({
  providedIn: 'root',
})
export class AngorakService {
  constructor(
    public Http: HttpService,
    public User: UserService,
    public Traefik: TraefikService,
    public DockerImage: DockerImageService,
    public DockerContainer: DockerContainerService,
    public Pm2: Pm2Service
  ) {}
}
