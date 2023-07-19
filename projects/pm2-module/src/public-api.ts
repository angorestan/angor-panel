/*
 * Public API Surface of pm2-module
 */

import { DotadminModule } from 'projects/dotadmin-core/src/public-api';

export const DotadminPm2Module: DotadminModule = {
  id: 'pm2',
  children: () =>
    import('./lib/pm2-module.module').then((m) => m.Pm2ModuleModule),
  icon: 'fitbit',
  name: 'PM2',
  link: '/panel/pm2',
};
