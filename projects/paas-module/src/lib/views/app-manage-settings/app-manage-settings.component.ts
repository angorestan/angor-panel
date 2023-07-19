import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'lib-app-manage-settings',
  templateUrl: './app-manage-settings.component.html',
  styleUrls: ['./app-manage-settings.component.css'],
  host: {
    class: 'flex flex-col p-20',
  },
})
export class AppManageSettingsComponent {
  public Deleteing: boolean = false;

  constructor(
    private router: Router,
    private toastService: ToastService,
    public DockerService: DockerService
  ) {}

  public Delete() {
    this.Deleteing = true;
    this.DockerService.DeleteDockerContainer().subscribe({
      next: (res) => {
        if (res.status) {
          this.toastService.Make({
            message: 'برنامه شما حذف شد',
            action: 'باشه',
          });
          this.router.navigate(['/panel/paas/app'], { replaceUrl: true });
        } else {
          this.toastService.Make({
            message: 'خطایی در حذف برنامه شما رخ داد',
            action: 'باشه',
          });
        }
      },
      complete: () => {
        this.Deleteing = false;
      },
    });
  }
}
