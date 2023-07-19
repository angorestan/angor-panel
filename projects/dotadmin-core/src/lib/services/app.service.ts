import { Inject, Injectable, InjectionToken } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  constructor(
    @Inject(APP_TITLE)
    public Title: string,
    @Inject(APP_NOTIFICATIONS_ROUTE)
    public NotificationsRoute: string
  ) {}

  public NotificationsCount: number = 0;

  public DrawerOpened: boolean = false;
}

export const APP_TITLE = new InjectionToken<string>(
  'DotadminAppTitleInjectToken'
);

export const APP_NOTIFICATIONS_ROUTE = new InjectionToken<string>(
  'DotadminAppNotificationsRoute'
);
