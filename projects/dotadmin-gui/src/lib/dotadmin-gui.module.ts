import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DialogModule } from '@angular/cdk/dialog';
import { DatepickerScrollComponent } from './components/datepicker-scroll/datepicker-scroll.component';
import { DatepickerPipe } from './pipes/datepicker.pipe';
import { SwiperModule } from 'swiper/angular';
import { DialogConfirmComponent } from './dialogs/dialog-confirm/dialog-confirm.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    DatepickerScrollComponent,
    DatepickerPipe,
    DialogConfirmComponent,
    ToolbarComponent,
  ],
  imports: [CommonModule, SwiperModule, DialogModule],
  exports: [
    DatepickerScrollComponent,
    DatepickerPipe,
    DialogConfirmComponent,
    DialogModule,
    ToolbarComponent,
  ],
})
export class DotadminGuiModule {}
