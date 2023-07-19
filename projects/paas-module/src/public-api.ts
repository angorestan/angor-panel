/*
 * Public API Surface of paas-module
 */
import { DotadminModule } from 'projects/dotadmin-core/src/public-api';

export const DotadminPaasModule: DotadminModule = {
  id: 'paas',
  children: () =>
    import('./lib/paas-module.module').then((m) => m.PaasModuleModule),
  icon: 'device_hub',
  name: ' PAAS',
  link: '/panel/paas',
  drawer: [],
};
