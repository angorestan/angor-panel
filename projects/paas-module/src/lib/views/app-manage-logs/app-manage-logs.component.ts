import { Component } from '@angular/core';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'lib-app-manage-logs',
  templateUrl: './app-manage-logs.component.html',
  styleUrls: ['./app-manage-logs.component.css'],
  host: {
    class: 'flex flex-col w-full h-full',
  },
})
export class AppManageLogsComponent {
  public Status: number = -1; // -1 = loading, 0 = done, 1 = error
  public Logs: string[] = [];

  constructor(private dockerService: DockerService) {}

  ngOnInit() {
    this.Status = -1;
    this.Logs = [];
    this.dockerService.LogsDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.Status = 0;
          this.Logs = (res.data as string).split('\n');
        } else {
          this.Logs = [];
          this.Status = 1;
        }
      },
      error: () => {
        this.Logs = [];
        this.Status = 1;
      },
    });
  }

  public Download() {
    const blob = new Blob([this.Logs.join('\n')], { type: 'text/plain' });
    const elem = window.document.createElement('a');
    elem.href = window.URL.createObjectURL(blob);
    elem.download = 'download.text';
    document.body.appendChild(elem);
    elem.click();
    document.body.removeChild(elem);
  }
}
