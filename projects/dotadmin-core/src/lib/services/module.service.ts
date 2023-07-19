import { Inject, inject, Injectable, InjectionToken } from '@angular/core';
import { DotadminModule } from './module.interface';

@Injectable({
  providedIn: 'root',
})
export class ModuleService {
  public ActiveModule: DotadminModule | undefined;
  public ActiveModuleDrawerItem: string | undefined;

  constructor(@Inject(MODULES) public Modules: DotadminModule[]) {}
}

export const MODULES = new InjectionToken<DotadminModule[]>(
  'ModuleInjectToken'
);
