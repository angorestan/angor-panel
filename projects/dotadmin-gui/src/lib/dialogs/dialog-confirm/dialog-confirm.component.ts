import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'lib-dialog-confirm',
  templateUrl: './dialog-confirm.component.html',
  styleUrls: ['./dialog-confirm.component.css'],
  host: {
    class: 'rounded-xl bg-base-100 p-4 flex flex-col -md:max-h-[380px]',
  },
})
export class DialogConfirmComponent {
  constructor(
    private ref: DialogRef,
    @Inject(DIALOG_DATA)
    public data: {
      title: string;
      description: string;
      yes?: string;
      no?: string;
    }
  ) {}

  public Yes() {
    this.ref.close(true);
  }

  public No() {
    this.ref.close();
  }
}
