import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouteListComponent } from './views/route-list/route-list.component';
import { DotadminGuiModule } from 'projects/dotadmin-gui/src/public-api';

@NgModule({
  declarations: [RouteListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DotadminGuiModule,
    RouterModule.forChild([
      {
        path: '',
        component: RouteListComponent,
      },
    ]),
  ],
  exports: [],
})
export class TraefikModuleModule {}
