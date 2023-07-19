import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DotadminGuiModule } from 'projects/dotadmin-gui/src/public-api';
import { ListComponent } from './views/list/list.component';

@NgModule({
  declarations: [ListComponent],
  imports: [
    CommonModule,
    DotadminGuiModule,
    RouterModule.forChild([
      {
        path: '',
        component: ListComponent,
        title: 'انگور - PM2',
      },
    ]),
  ],
  exports: [],
})
export class Pm2ModuleModule {}
