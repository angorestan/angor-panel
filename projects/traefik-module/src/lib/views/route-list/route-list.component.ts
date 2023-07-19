import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Dialog } from '@angular/cdk/dialog';
import {
  AngorakService,
  IApiTraefikRoute,
} from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';
import { DialogConfirmComponent } from 'projects/dotadmin-gui/src/lib/dialogs/dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'lib-route-list',
  templateUrl: './route-list.component.html',
  styleUrls: ['./route-list.component.css'],
  host: {
    class: 'flex flex-col h-full',
  },
})
export class RouteListComponent {
  public EditMode: boolean = false;
  public VisableDrawer: boolean = false;
  public Routes: IApiTraefikRoute[] | undefined = [];
  public NameIsExists: number = 0; // 0 = unknown, 1 = false, 2 = true, -1 = loading, -2 = error

  public FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(5)]),
    domain: new FormControl('', [Validators.required]),
    port: new FormControl(80, [
      Validators.required,
      Validators.min(0),
      Validators.max(65535),
    ]),
    host: new FormControl('127.0.0.1', [Validators.required]),
    cert: new FormControl(true),
    protocol: new FormControl('http', [Validators.required]), // http, tcp
  });

  private timeout: any;
  private errors: string[] = [];

  constructor(
    private dialog: Dialog,
    private angorak: AngorakService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.FetchRoutes();
  }

  public Close() {
    this.FormGroup.patchValue({
      name: '',
      domain: '',
      port: 80,
      host: '127.0.0.1',
      cert: true,
      protocol: 'http',
    });
    this.NameIsExists = 0;
    this.VisableDrawer = false;
    this.EditMode = false;
  }

  public FetchRoutes() {
    this.angorak.Traefik.List().subscribe({
      next: (res) => {
        if (res.status) {
          this.Routes = res.data;
        } else {
          this.Routes = [];
        }
      },
      error: () => {
        this.Routes = [];
      },
    });
  }

  public OnNameChange() {
    this.NameIsExists = 0;
    if (this.FormGroup.get('name')?.invalid) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const value = (this.FormGroup.get('name')!.value as string) ?? '';
      this.NameIsExists = -1;
      this.angorak.Traefik.Exists(value).subscribe({
        next: (res) => {
          if (res.status) this.NameIsExists = res.data.exists ? 2 : 1;
          else this.NameIsExists = -2;
        },
        error: () => {
          this.NameIsExists = -2;
        },
      });
    }, 300);
  }

  public Delete(name: string) {
    this.dialog
      .open(DialogConfirmComponent, {
        data: {
          title: 'حذف مسیر',
          description: 'آیا واقعا می خواهید این مسیر را حذف کنید ؟',
          yes: 'تایید و حذف',
        },
      })
      .closed.subscribe({
        next: (status) => {
          if (status) {
            this.angorak.Traefik.Delete(name).subscribe({
              next: (res) => {
                if (res.status) {
                  this.toastService.Make({
                    message: 'مسیر با موفقیت حذف شد',
                    action: 'باشه',
                  });
                  this.FetchRoutes();
                } else {
                  this.toastService.Make({
                    message: 'خطا در حذف مسیر رخ داد',
                    action: 'باشه',
                  });
                }
              },
            });
          }
        },
      });
  }

  public Edit(item: IApiTraefikRoute) {
    this.FormGroup.patchValue(item);
    this.VisableDrawer = true;
    this.EditMode = true;
  }

  public Submit() {
    this.FormGroup.markAllAsTouched();

    this.errors = [];

    if (this.FormGroup.valid) {
      this.FormGroup.disable();

      const value: any = {
        name: this.FormGroup.get('name')!.value,
        domain: this.FormGroup.get('domain')!.value,
        port: this.FormGroup.get('port')!.value,
        host: this.FormGroup.get('host')!.value,
        cert:
          typeof this.FormGroup.get('cert')!.value == 'string'
            ? (this.FormGroup.get('cert')!.value as any) == '1'
            : this.FormGroup.get('cert')!.value,
        protocol: this.FormGroup.get('protocol')!.value ?? 'http',
      };

      if (this.EditMode) {
        this.angorak.Traefik.Edit(value).subscribe({
          next: (res) => {
            if (res.status) {
              this.toastService.Make({
                message: 'مسیر جدید ویرایش شد',
                action: 'باشه',
              });
              this.FetchRoutes();
              this.Close();
            } else {
              this.toastService.Make({
                message: 'خطایی در ویرایش مسیر رخ داد',
                action: 'باشه',
              });
            }
          },
          error: () => {
            this.toastService.Make({
              message: 'خطایی در ویرایش مسیر رخ داد',
              action: 'باشه',
            });
          },
          complete: () => {
            this.FormGroup.enable();
          },
        });
      } else {
        this.angorak.Traefik.Create(value).subscribe({
          next: (res) => {
            if (res.status) {
              this.toastService.Make({
                message: 'مسیر جدید ساخته شد',
                action: 'باشه',
              });
              this.FetchRoutes();
              this.Close();
            } else {
              this.toastService.Make({
                message: 'خطایی در ساخت مسیر رخ داد',
                action: 'باشه',
              });
            }
          },
          error: () => {
            this.toastService.Make({
              message: 'خطایی در ساخت مسیر رخ داد',
              action: 'باشه',
            });
          },
          complete: () => {
            this.FormGroup.enable();
          },
        });
      }
    } else {
      this.toastService.Make({
        message: 'اطلاعات ورودی را بررسی کنید',
        action: 'باشه',
      });

      this.errors = Object.keys(this.FormGroup.controls).filter(
        (key) => this.FormGroup.get(key)!.invalid
      );
    }
  }

  public HasError(key: string) {
    return this.errors.includes(key);
  }
}
