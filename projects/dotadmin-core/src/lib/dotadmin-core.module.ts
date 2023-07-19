import { ModuleWithProviders, NgModule } from '@angular/core';
import { Route, RouterModule, ROUTES, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './views/auth/login/login.component';
import { RegisterComponent } from './views/auth/register/register.component';
import { ForgetComponent } from './views/auth/forget/forget.component';
import { AppComponent } from './views/app/app.component';

import { PanelComponent } from './views/layout/panel/panel.component';
import { AuthComponent } from './views/layout/auth/auth.component';

import {
  APP_NOTIFICATIONS_ROUTE,
  APP_TITLE,
  DotadminModule,
  MODULES,
} from './services';

const routes: Routes = [
  {
    path: 'auth',
    component: AuthComponent,
    children: [
      {
        path: 'login',
        component: LoginComponent,
      },
      {
        path: 'register',
        component: RegisterComponent,
      },
      {
        path: 'forget',
        component: ForgetComponent,
      },
      {
        path: '**',
        redirectTo: '/auth/login',
      },
    ],
  },
];

@NgModule({
  declarations: [
    LoginComponent,
    PanelComponent,
    AppComponent,
    AuthComponent,
    RegisterComponent,
    ForgetComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forRoot([]),
  ],
  exports: [AppComponent, RouterModule],
})
export class DotadminCoreModule {
  static forRoot(
    params: DotadminCoreModuleForRootParams
  ): ModuleWithProviders<DotadminCoreModule> {
    return {
      ngModule: DotadminCoreModule,
      providers: [
        {
          provide: ROUTES,
          multi: true,
          useFactory: (): Routes => {
            return [
              ...routes,
              {
                path: 'panel',
                component: PanelComponent,
                children: params.modules.map((item) => ({
                  path: item.id,
                  loadChildren: item.children,
                })),
              },
            ];
          },
        },
        {
          provide: MODULES,
          multi: false,
          useValue: params.modules,
        },
        {
          provide: APP_TITLE,
          multi: false,
          useValue: params.config.title,
        },
        {
          provide: APP_NOTIFICATIONS_ROUTE,
          multi: false,
          useValue: params.config.routes
            ? params.config.routes.notifications
            : undefined,
        },
      ],
    };
  }
}

interface DotadminCoreModuleForRootParams {
  modules: DotadminModule[];
  config: {
    title: string;
    routes?: {
      notifications?: string;
    };
  };
}
