/*
 * Public API Surface of traefik-module
 */

import { DotadminModule } from 'projects/dotadmin-core/src/public-api';

export const DotadminTraefikModule: DotadminModule = {
  id: 'traefik',
  children: () =>
    import('./lib/traefik-module.module').then((m) => m.TraefikModuleModule),
  icon: 'settings_input_antenna',
  name: 'TREAFIK',
  link: '/panel/traefik',
};
