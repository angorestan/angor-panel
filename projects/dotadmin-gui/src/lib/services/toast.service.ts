import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}

  public Make(params: IToastMakeParams) {
    const subject = new Subject();
    const alert = document.createElement('div');
    alert.className = 'alert bg-black text-white min-w-[250px]';

    const div = document.createElement('div');

    const span = document.createElement('span');
    span.innerText = params.message;
    div.appendChild(span);

    if (params.action) {
      const button = document.createElement('button');
      button.className = 'btn btn-ghost mr-4';
      button.innerText = params.action;
      button.onclick = () => {
        this.container.removeChild(alert);
        if (subject.closed == false) subject.complete();
      };
      div.appendChild(button);
    }

    alert.appendChild(div);

    this.container.appendChild(alert);

    setTimeout(() => {
      this.container.removeChild(alert);
      if (subject.closed == false) subject.complete();
    }, params.duration ?? 3000);

    return subject;
  }

  private get container(): HTMLElement {
    const container = document.getElementById('dotadmin-toast-container');

    if (container) {
      return container;
    }

    const div = document.createElement('div');
    div.id = 'dotadmin-toast-container';
    div.className = 'toast z-50';

    document.body.appendChild(div);

    return div;
  }
}

export interface IToastMakeParams {
  message: string;
  duration?: number;
  action?: string;
}
