import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';
import { Subscription } from 'rxjs/internal/Subscription';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'lib-layout-app-manage',
  templateUrl: './layout-app-manage.component.html',
  styleUrls: ['./layout-app-manage.component.css'],
  host: {
    class: 'flex flex-nowrap w-full h-full',
  },
})
export class LayoutAppManageComponent {
  private subscription!: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
    private toastService: ToastService,
    public DockerService: DockerService
  ) {}

  ngOnInit() {
    this.subscription = this.activatedRoute.params.subscribe((params) => {
      this.DockerService.FetchAndSelectDockerContainer(params['key']);
    });
  }

  ngOnDestroy() {
    this.DockerService.Container = undefined;
    this.subscription.unsubscribe();
  }

  public Start() {
    this.DockerService.StartDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.DockerService.FetchAndSelectDockerContainer();
          this.toastService.Make({
            message: 'درخواست روشن کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
    });
  }

  public Stop() {
    this.DockerService.StopDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.DockerService.FetchAndSelectDockerContainer();
          this.toastService.Make({
            message: 'درخواست خاموش کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
    });
  }

  public Restart() {
    this.DockerService.RestartDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.DockerService.FetchAndSelectDockerContainer();
          this.toastService.Make({
            message: 'درخواست ریست کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
    });
  }
}
