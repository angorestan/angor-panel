import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngorakService } from 'projects/angorak/src/public-api';
import { UserService } from 'projects/dotadmin-core/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'dotadmin-auth-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  host: {
    class: 'flex flex-col gap-2',
  },
})
export class LoginComponent {
  public VisiblePassword: boolean = false;

  public FormGroup: FormGroup = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private angorak: AngorakService,
    private toastService: ToastService,
    private userService: UserService
  ) {}

  public Submit() {
    this.FormGroup.markAllAsTouched();

    if (this.FormGroup.valid) {
      this.FormGroup.disable();

      this.angorak.User.Login(this.FormGroup.value).subscribe({
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
              message: 'شما با موفقیت وارد شدید',
              action: 'باشه',
            });
            // store access token
            this.angorak.Http.setAndSaveTokenInStorage(res.data.token);
            this.router.navigate(['/panel'], { replaceUrl: true });
          }
        },
        error: () => {
          this.toastService.Make({
            message: 'خطایی غیر منتظره رخ داد',
            action: 'باشه',
          });
          this.FormGroup.enable();
        },
        complete: () => {
          this.FormGroup.enable();
        },
      });
    }
  }
}
