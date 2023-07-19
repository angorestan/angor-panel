import { Component } from '@angular/core';
import { IApiDockerContainerStats } from 'projects/angorak/src/lib/interfaces/api.docker';
import { DockerService } from '../../services/docker.service';
import { ChartConfiguration, ChartOptions, ChartType } from 'chart.js';

@Component({
  selector: 'lib-app-manage-dashboard',
  templateUrl: './app-manage-dashboard.component.html',
  styleUrls: ['./app-manage-dashboard.component.css'],
  host: {
    class: 'flex flex-nowrap gap-10 p-20',
  },
})
export class AppManageDashboardComponent {
  public Stats: IApiDockerContainerStats[] = [];

  public get lineChartData(): ChartConfiguration<'line'>['data'] {
    return {
      labels: this.Stats.map(() => ''),
      datasets: [
        {
          data: this.Stats.map((item) => item.cpu ?? 0),
          label: 'پردازش',
          fill: false,
          pointBackgroundColor: '#ef4444',
          borderColor: '#ef4444',
        },
        {
          data: this.Stats.map((item) => item.memory ?? 0),
          label: 'حافظه',
          fill: false,
          pointBackgroundColor: '#f59e0b',
          borderColor: '#f59e0b',
        },
        {
          data: this.Stats.map((item) =>
            item.network && item.network.eth0 ? item.network.eth0.rx_bytes : 0
          ),
          label: 'نت ورودی',
          fill: false,
          pointBackgroundColor: '#059669',
          borderColor: '#059669',
        },
        {
          data: this.Stats.map((item) =>
            item.network && item.network.eth0 ? item.network.eth0.tx_bytes : 0
          ),
          label: 'نت خروجی',
          fill: false,
          pointBackgroundColor: '#2563eb',
          borderColor: '#2563eb',
        },
      ],
    };
  }
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    animation: false,
    scales: {
      y: { display: false, beginAtZero: true },
      x: { display: false },
    },
  };
  public lineChartLegend = true;

  constructor(public DockerService: DockerService) {}

  ngOnInit() {
    this.fetchStats();
  }

  public GetPorts(): string {
    return this.DockerService.Container!.image.ports.map(
      (item) => item.source
    ).join(' ، ');
  }

  public GetEnvs(): any[] {
    return Object.keys(this.DockerService.Container!.envs).map((key: any) => ({
      key:
        this.DockerService.Container!.image.envs.find((item) => item.key == key)
          ?.text ?? key,
      value: this.DockerService.Container!.envs[key],
    }));
  }

  private fetchStats() {
    this.DockerService.StatsDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.Stats.push(res.data);
        }
      },
      complete: () => {
        setTimeout(() => {
          this.fetchStats();
        }, 10000);
      },
    });
  }
}
