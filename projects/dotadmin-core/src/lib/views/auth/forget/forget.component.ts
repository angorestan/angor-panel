import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngorakService } from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'dotadmin-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.css'],
  host: {
    class: 'flex flex-col gap-2',
  },
})
export class ForgetComponent {
  public FormGroup: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  constructor(
    private router: Router,
    private angorak: AngorakService,
    private toastService: ToastService
  ) {}

  public Submit() {
    this.FormGroup.markAllAsTouched();

    if (this.FormGroup.valid) {
      this.FormGroup.disable();

      this.angorak.User.Forget(this.FormGroup.value).subscribe({
        next: (res) => {
          if (res.status == false) {
            switch (res.error) {
              case 2:
                this.toastService.Make({
                  message: 'اطلاعات کاربری اشتباه است',
                  action: 'باشه',
                });
                break;

              default:
                break;
            }
          } else {
            this.toastService.Make({
              message: 'لینک تغییر کلمه عبور ایمیل شد',
              action: 'باشه',
            });
            this.router.navigate(['/auth/login'], { replaceUrl: true });
          }
        },
        complete: () => {
          this.FormGroup.enable();
        },
      });
    }
  }
}
