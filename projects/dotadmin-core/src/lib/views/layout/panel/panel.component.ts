import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Subscription } from 'rxjs';
import { AppService, ModuleService, UserService } from '../../../services';

@Component({
  selector: 'lib-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.scss'],
  host: {
    class: 'flex flex-col w-screen h-full overflow-hidden bg-base-300 z-0',
  },
})
export class PanelComponent {
  public Loading: boolean = true;

  constructor(
    public ModuleService: ModuleService,
    public AppService: AppService,
    public UserService: UserService,
    private router: Router
  ) {}

  private _subscription!: Subscription;

  ngOnInit() {
    this.init();
    this._subscription = this.router.events.subscribe({
      next: () => {
        this.detectRouter();
      },
    });
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }

  private init() {
    forkJoin([this.UserService.Whoami()]).subscribe({
      error: () => {
        this.router.navigate(['/auth/login'], { replaceUrl: true });
      },
      complete: () => {
        this.Loading = false;
      },
    });
  }

  private detectRouter() {
    const url = this.router.url.split('/').slice(1);
    const moduleId: string | undefined = url[1];

    if (moduleId) {
      const module = this.ModuleService.Modules.find(
        (item) => item.id == moduleId
      );

      this.ModuleService.ActiveModule = module;
    }

    this.ModuleService.ActiveModuleDrawerItem = this.router.url;
  }
}
