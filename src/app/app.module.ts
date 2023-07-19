import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DotadminDockerModule } from 'projects/docker-module/src/public-api';
import { DotadminCoreModule } from 'projects/dotadmin-core/src/public-api';
import { DotadminPaasModule } from 'projects/paas-module/src/public-api';
import { DotadminPm2Module } from 'projects/pm2-module/src/public-api';
import { DotadminTraefikModule } from 'projects/traefik-module/src/public-api';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    DotadminCoreModule.forRoot({
      modules: [
        DotadminPaasModule,
        DotadminTraefikModule,
        DotadminPm2Module,
        DotadminDockerModule,
      ],
      config: {
        title: 'انگور',
      },
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
