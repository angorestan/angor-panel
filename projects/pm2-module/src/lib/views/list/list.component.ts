import { Component } from '@angular/core';
import { AngorakService } from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'lib-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
  host: {
    class: 'flex flex-col h-full text-en',
    dir: 'ltr'
  }
})
export class ListComponent {
  public List: any[] = [];
  public Loading: boolean = false;

  constructor(
    private angorak: AngorakService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.angorak.Pm2.List().subscribe({
      next: (res) => {
        if (res.status) {
          this.List = res.data;
        } else {
          this.List = [];
        }
      },
      error: () => {
        this.List = [];
      },
    });
  }

  public Start(name: string) {
    this.Loading = true;
    this.angorak.Pm2.Start(name).subscribe({
      next: (res) => {
        if (res.status) {
          this.ngOnInit();
          this.toastService.Make({
            message: 'درخواست روشن کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
      complete: () => {
        this.Loading = false;
      },
    });
  }

  public Stop(name: string) {
    this.Loading = true;
    this.angorak.Pm2.Stop(name).subscribe({
      next: (res) => {
        if (res.status) {
          this.ngOnInit();
          this.toastService.Make({
            message: 'درخواست خاموش کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
      complete: () => {
        this.Loading = false;
      },
    });
  }

  public Restart(name: string) {
    this.Loading = true;
    this.angorak.Pm2.Restart(name).subscribe({
      next: (res) => {
        if (res.status) {
          this.ngOnInit();
          this.toastService.Make({
            message: 'درخواست ریست کردن ارسال شد',
            action: 'باشه',
          });
        }
      },
      complete: () => {
        this.Loading = false;
      },
    });
  }
}
