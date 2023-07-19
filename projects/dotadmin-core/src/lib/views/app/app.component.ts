import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngorakService } from 'projects/angorak/src/public-api';

@Component({
  selector: 'dotadmin-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    class: 'block w-screen h-full overflow-hidden',
  },
})
export class AppComponent {
  constructor(private router: Router, private angorak: AngorakService) {}

  ngOnInit() {
    this.angorak.Http.setTokenFromStorage();
    if (!this.angorak.Http.token)
      this.router.navigate(['/auth/login'], { replaceUrl: true });
    else if (window.location.pathname == '/') {
      this.router.navigate(['/panel'], { replaceUrl: true });
    }
  }
}
