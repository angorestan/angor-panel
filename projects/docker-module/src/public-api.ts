/*
 * Public API Surface of docker-module
 */

import { DotadminModule } from 'projects/dotadmin-core/src/public-api';

export const DotadminDockerModule: DotadminModule = {
  id: 'docker',
  children: () =>
    import('./lib/docker-module.module').then((m) => m.DockerModuleModule),
  icon: 'anchor',
  name: ' داکر',
  link: '/panel/docker',
  drawer: [
    {
      link: '/panel/docker',
      title: 'پیشخان',
      icon: 'dashboard',
    },
    {
        link: '/panel/docker/images',
        title: 'داکر ایمیج ها',
    }
  ],
};
