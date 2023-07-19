import { LoadChildrenCallback } from '@angular/router';

export interface DotadminModule {
  id: string;
  children: LoadChildrenCallback;
  icon: string;
  name: string;
  link: string;
  drawer?: DotadminModuleDrawerItem[];
  permission?: string | string[];
}

export interface DotadminModuleDrawerItem {
  link: string;
  title: string;
  icon?: string;
  permission?: string | string[];
  items?: DotadminModuleDrawerItem[];
}
