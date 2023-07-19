import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './views/dashboard/dashboard.component';

@NgModule({
  declarations: [DashboardComponent],
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: DashboardComponent,
      },
    ]),
  ],
  exports: [],
})
export class UserModuleModule {}
