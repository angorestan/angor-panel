import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AngorakService } from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'dotadmin-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  host: {
    class: 'flex flex-col gap-2'
  }
})
export class RegisterComponent {
  public VisiblePassword: boolean = false;

  public FormGroup: FormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    username: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8)]),
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

      this.angorak.User.Register(this.FormGroup.value).subscribe({
        next: (res) => {
          if (res.status == false) {
            switch (res.error) {
              case 2:
                this.toastService.Make({
                  message: 'این نام کاربری قبلا ثبت شده است',
                  action: 'باشه',
                });
                break;

              default:
                break;
            }
          } else {
            this.toastService.Make({
              message: 'شما با موفقیت ثبت نام کردید',
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
