import { Location } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'dot-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css'],
  host: {
    class: 'flex flex-nowrap items-center gap-4 border-b p-4 h-[74px] sticky top-0 bg-base-100 z-20'
  }
})
export class ToolbarComponent {
  @Input() title?: string;
  @Input() subtitle?: string;
  @Input() icon?: string;
  @Input() backable?: boolean;

  constructor(public Location: Location) {}
}