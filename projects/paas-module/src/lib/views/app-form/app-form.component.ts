import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IApiDockerContainerCreateParams,
  IApiDockerImage,
  IApiDockerImageEnv,
  TApiDockerImageCategory,
} from 'projects/angorak/src/lib/interfaces/api.docker';
import { AngorakService } from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';
import { DockerService } from '../../services/docker.service';

@Component({
  selector: 'lib-app-form',
  templateUrl: './app-form.component.html',
  styleUrls: ['./app-form.component.css'],
  host: {
    class: 'flex flex-col h-full',
  },
})
export class AppFormComponent {
  public SelectedCategory: TApiDockerImageCategory = 'language';
  public SelectedImage: IApiDockerImage | undefined;
  public KeyIsExists: number = 0; // 0 = unknown, 1 = false, 2 = true, -1 = loading, -2 = error

  public FormGroup = new FormGroup({
    key: new FormControl('', [Validators.required, Validators.minLength(5)]),
    envs: new FormGroup({}),
  });

  public get SelectedImageEnvs(): IApiDockerImageEnv[] {
    return this.SelectedImage
      ? this.SelectedImage.envs.filter((item) => !item.hidden)
      : [];
  }

  private timeout: any;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angorak: AngorakService,
    private toastService: ToastService,
    public DockerService: DockerService
  ) {}

  ngOnInit() {
    this.DockerService.FetchDockerImages();

    setTimeout(() => {
      const { category } = this.activatedRoute.snapshot.queryParams;
      if (category && ['database', 'app', 'language'].includes(category)) {
        this.SelectedCategory = category;
      }
    }, 0);
  }

  public GetDockerImagesFilteredByCategory(
    category: TApiDockerImageCategory
  ): IApiDockerImage[] {
    return this.DockerService.Images!.filter(
      (item) => item.category == category
    );
  }

  public SelectImage(item: IApiDockerImage) {
    const keys = item.envs.map((item) => item.key);

    const envsFormGroup = new FormGroup(
      keys
        .filter((_, index) => !item.envs[index].hidden)
        .reduce(
          (prev, curr) => ({
            ...prev,
            [curr]: new FormControl('', [Validators.required]),
          }),
          {}
        )
    );

    this.FormGroup = new FormGroup({
      key: new FormControl('', [Validators.required, Validators.minLength(5)]),
      envs: envsFormGroup,
    });

    this.KeyIsExists = 0;

    this.SelectedImage = item;
  }

  public OnKeyChange() {
    this.KeyIsExists = 0;
    if (this.FormGroup.get('key')?.invalid) return;
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      const value = (this.FormGroup.get('key')!.value as string) ?? '';
      this.KeyIsExists = -1;
      this.angorak.DockerContainer.Exists(value).subscribe({
        next: (res) => {
          if (res.status) this.KeyIsExists = res.data.exists ? 2 : 1;
          else this.KeyIsExists = -2;
        },
        error: () => {
          this.KeyIsExists = -2;
        },
      });
    }, 300);
  }

  public Submit() {
    this.FormGroup.markAllAsTouched();

    if (this.FormGroup.valid) {
      const value: IApiDockerContainerCreateParams = {
        image: this.SelectedImage!.key!,
        ...(this.FormGroup.value as any),
      };
      this.FormGroup.disable();

      this.angorak.DockerContainer.Create(value).subscribe({
        next: (res) => {
          if (!res.status) {
            switch (res.error) {
              case 5:
                this.toastService.Make({
                  message: 'همچین برنامه ای با این نام وجود دارد',
                  action: 'باشه',
                });
                break;
              case 1:
              case 4:
                this.toastService.Make({
                  message: 'نتونستیم برنامه رو بسازیم',
                  action: 'باشه',
                });
                break;

              case 3:
              case 2:
                this.toastService.Make({
                  message: 'برنامه ای که انتخاب کردید وجود ندارد',
                  action: 'باشه',
                });
                break;

              default:
                break;
            }
          } else {
            this.toastService.Make({
              message: 'برنامه شما با موفقیت ساخته شد',
              action: 'باشه',
            });
            this.router.navigate(['/panel/paas/app'], { replaceUrl: true });
          }
        },
        error: () => {},
        complete: () => {
          this.FormGroup.enable();
        },
      });
    }
  }
}
