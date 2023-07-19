/*
 * Public API Surface of user-module
 */

import { DotadminModule } from 'projects/dotadmin-core/src/public-api';

export const DotadminUserModule: DotadminModule = {
  id: 'user',
  children: () =>
    import('./lib/user-module.module').then((m) => m.UserModuleModule),
  icon: 'group',
  name: ' کاربران',
  link: '/panel/user',
  drawer: [
    {
      link: '/panel/user',
      title: 'پیشخان',
      icon: 'dashboard',
    },
  ],
};
