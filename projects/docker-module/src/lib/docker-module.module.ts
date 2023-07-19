import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ImageListComponent } from './views/image-list/image-list.component';
import { ImageFormComponent } from './views/image-form/image-form.component';
import { DashboardComponent } from './views/dashboard/dashboard.component';
import { DotadminGuiModule } from 'projects/dotadmin-gui/src/public-api';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ImageListComponent,
    ImageFormComponent,
    DashboardComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DotadminGuiModule,
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
        title: 'پیشخان'
      },
      {
        path: 'images',
        title: 'داکر ایمیج ها',
        component: ImageListComponent,
      },
      {
        path: 'images/form',
        title: 'داکر ایمیج ها',
        component: ImageFormComponent,
      },
      // {
      //   path: 'containers',
      //   title: 'داکر کانتینر ها',
      // },
      // {
      //   path: 'containers/:id',
      //   title: 'داکر کانتینر ها',
      // },
    ]),
  ],
  exports: [],
})
export class DockerModuleModule {}
