import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngorakService, IApiUser } from 'projects/angorak/src/public-api';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  public Profile: IApiUser | undefined;

  constructor(private angorak: AngorakService, private router: Router) {}

  public Whoami() {
    return this.angorak.User.Me().pipe(
      tap({
        next: (res) => {
          if (res.status == true) {
            this.Profile = res.data;
          }
        },
      })
    );
  }

  public Logout() {
    this.router.navigate(['/auth/login']);
    this.angorak.Http.unsetToken();
    this.Profile = undefined;
  }
}
