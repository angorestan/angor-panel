import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';


import { AppListComponent } from './views/app-list/app-list.component';
import { AppFormComponent } from './views/app-form/app-form.component';
import { LayoutAppManageComponent } from './layouts/layout-app-manage/layout-app-manage.component';
import { AppManageDashboardComponent } from './views/app-manage-dashboard/app-manage-dashboard.component';
import { AppManageLogsComponent } from './views/app-manage-logs/app-manage-logs.component';
import { AppManageTerminalComponent } from './views/app-manage-terminal/app-manage-terminal.component';
import { AppManageSettingsComponent } from './views/app-manage-settings/app-manage-settings.component';
import { DotadminGuiModule } from 'projects/dotadmin-gui/src/public-api';

@NgModule({
  declarations: [
    AppListComponent,
    AppFormComponent,
    LayoutAppManageComponent,
    AppManageDashboardComponent,
    AppManageLogsComponent,
    AppManageTerminalComponent,
    AppManageSettingsComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgChartsModule,
    DotadminGuiModule,
    RouterModule.forChild([
      {
        path: 'app',
        component: AppListComponent,
        title: 'انگور - PAAS - برنامه ها',
      },
      {
        path: 'app/create',
        component: AppFormComponent,
        title: 'انگور - PAAS - ایجاد برنامه',
      },
      {
        path: 'app/manage/:key',
        component: LayoutAppManageComponent,
        children: [
          {
            path: '',
            component: AppManageDashboardComponent,
            title: 'انگور - PAAS - مدیریت برنامه',
          },
          {
            path: 'logs',
            component: AppManageLogsComponent
          },
          {
            path: 'terminal',
            component: AppManageTerminalComponent
          },
          {
            path: 'settings',
            component: AppManageSettingsComponent
          }
        ],
      },
      {
        path: '**',
        redirectTo: '/panel/paas/app',
      },
    ]),
  ],
  exports: [],
})
export class PaasModuleModule {}
