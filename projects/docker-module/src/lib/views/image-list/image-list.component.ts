import { Dialog } from '@angular/cdk/dialog';
import { Component } from '@angular/core';
import { AngorakService } from 'projects/angorak/src/public-api';
import { DialogConfirmComponent } from 'projects/dotadmin-gui/src/lib/dialogs/dialog-confirm/dialog-confirm.component';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'lib-image-list',
  templateUrl: './image-list.component.html',
  styleUrls: ['./image-list.component.css'],
  host: {
    class: 'flex flex-col h-full',
  },
})
export class ImageListComponent {
  public Data: any[] = [];

  constructor(
    private angorak: AngorakService,
    private dialog: Dialog,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.angorak.DockerImage.List().subscribe({
      next: (res) => {
        if (res['status']) {
          this.Data = res['data'];
        }
      },
    });
  }

  public FormatPorts(ports: any[]): string {
    return ports.map((port) => port.source + ':' + port.destination).join(',');
  }

  public FormatMounts(mounts: any[]): string {
    return mounts.map((mount) => mount.source).join(',');
  }

  public FormatEnvs(envs: any[]): string {
    return envs.map((env) => env.key).join(',');
  }

  public Delete(key: string) {
    this.dialog
      .open(DialogConfirmComponent, {
        data: {
          title: 'حذف ایمیج',
          description: 'آیا واقعا می خواهید این ایمیج را حذف کنید ؟',
          yes: 'تایید و حذف',
        },
      })
      .closed.subscribe({
        next: (status) => {
          if (status) {
            this.angorak.DockerImage.Delete(key).subscribe({
              next: (res) => {
                if (res.status) {
                  this.toastService.Make({
                    message: 'ایمیج با موفقیت حذف شد',
                    action: 'باشه',
                  });
                  this.ngOnInit();
                } else {
                  this.toastService.Make({
                    message: 'خطا در حذف ایمیج رخ داد',
                    action: 'باشه',
                  });
                }
              },
            });
          }
        },
      });
  }
}
