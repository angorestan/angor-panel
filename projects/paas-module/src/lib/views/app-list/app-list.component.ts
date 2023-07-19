import { Component } from '@angular/core';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'lib-app-list',
  templateUrl: './app-list.component.html',
  styleUrls: ['./app-list.component.css'],
})
export class AppListComponent {
  constructor(public DockerService: DockerService) {}

  ngOnInit() {
    this.DockerService.FetchDockerContainers();
  }
}
