import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AngorakService,
  IApiDockerImageEnv,
  IApiDockerImageMount,
  IApiDockerImagePort,
} from 'projects/angorak/src/public-api';
import { ToastService } from 'projects/dotadmin-gui/src/public-api';

@Component({
  selector: 'lib-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.css'],
  host: {
    class: 'flex flex-col h-full',
  },
})
export class ImageFormComponent {
  public FormGroup = new FormGroup({
    key: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    unique: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    tag: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
    logo: new FormControl('', [Validators.required]),
    mounts: new FormControl([], []),
    ports: new FormControl([], []),
    envs: new FormControl([], []),
  });

  public MountKey: string = '';
  public MountSource: string = '';

  public PortSource: number = 80;
  public PortDestination: number = 80;

  public EnvKey: string = '';
  public EnvText: string = '';
  public EnvType: 'string' | number | 'boolean' = 'string';
  public EnvValue: string | number | boolean = '';
  public EnvHidden: boolean = false;

  private errors: string[] = [];

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private angorak: AngorakService,
    private toastService: ToastService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['key']) {
        this.angorak.DockerImage.One(params['key']).subscribe({
          next: (res) => {
            if (res['status'] && res['data']) {
              this.FormGroup.patchValue(res['data']);
            }
          },
        });
      }
    });
  }

  public Submit() {
    this.FormGroup.markAllAsTouched();

    const { key } = this.activatedRoute.snapshot.queryParams;
    const value = this.FormGroup.value;

    if (this.FormGroup.valid) {
      this.FormGroup.disable();
      if (key) {
        this.angorak.DockerImage.Update(key, value).subscribe({
          next: (res) => {
            if (res['status']) {
              this.toastService.Make({
                message: 'تغییرات با موفقیت اعمال شد',
                action: 'باشه',
              });
              this.router.navigate(['/panel/docker/images'], {
                replaceUrl: true,
              });
            } else {
              this.toastService.Make({
                message: 'خطا در اعمال تغییرات',
                action: 'باشه',
              });
            }
            this.FormGroup.enable();
          },
          error: (err) => {
            this.toastService.Make({
              message: 'خطا در اعمال تغییرات',
              action: 'باشه',
            });
            this.FormGroup.enable();
          },
        });
      } else {
        this.angorak.DockerImage.Create(value).subscribe({
          next: (res) => {
            if (res['status']) {
              this.toastService.Make({
                message: 'ایمیج با موفقیت ایجاد شد',
                action: 'باشه',
              });
              this.router.navigate(['/panel/docker/images'], {
                replaceUrl: true,
              });
            } else {
              this.toastService.Make({
                message: 'خطا در ایجاد ایمیج رخ داد',
                action: 'باشه',
              });
              this.FormGroup.enable();
            }
          },
          error: (err) => {
            this.toastService.Make({
              message: 'خطا در ایجاد ایمیج رخ داد',
              action: 'باشه',
            });
            this.FormGroup.enable();
          },
        });
      }
    } else {
      this.errors = Object.keys(this.FormGroup.controls).filter((key) => {
        const control = this.FormGroup.get(key);
        return control?.invalid && control?.touched;
      });
    }
  }

  public HasError(controlName: string) {
    return this.errors.includes(controlName);
  }

  // mounts

  public get Mounts(): IApiDockerImageMount[] {
    return this.FormGroup.get('mounts')!.value as any;
  }

  public AddMount() {
    const mounts: any = this.Mounts;
    mounts.push({
      key: this.MountKey,
      source: this.MountSource,
      hidden: true,
    });
    this.FormGroup.get('mounts')!.setValue(mounts);
    this.MountKey = '';
    this.MountSource = '';
  }

  public DeleteMount(index: number) {
    const mounts: any = this.Mounts;
    mounts.splice(index, 1);
    this.FormGroup.get('mounts')!.setValue(mounts);
  }

  // ports

  public get Ports(): IApiDockerImagePort[] {
    return this.FormGroup.get('ports')!.value as any;
  }

  public AddPort() {
    const ports: any = this.Ports;
    ports.push({
      source: this.PortSource,
      destination: this.PortDestination,
      hidden: true,
    });
    this.FormGroup.get('ports')!.setValue(ports);
    this.PortSource = 80;
    this.PortDestination = 80;
  }

  public DeletePort(index: number) {
    const ports: any = this.Ports;
    ports.splice(index, 1);
    this.FormGroup.get('ports')!.setValue(ports);
  }

  // envs

  public get Envs(): IApiDockerImageEnv[] {
    return this.FormGroup.get('envs')!.value as any;
  }

  public AddEnv() {
    const envs: any = this.Envs;
    envs.push({
      key: this.EnvKey,
      text: this.EnvText,
      type: this.EnvType,
      value: this.EnvValue,
      hidden: this.EnvHidden,
    });
    this.FormGroup.get('envs')!.setValue(envs);
    this.EnvKey = '';
    this.EnvText = '';
    this.EnvType = 'string';
    this.EnvValue = '';
    this.EnvHidden = false;
  }

  public DeleteEnv(index: number) {
    const envs: any = this.Envs;
    envs.splice(index, 1);
    this.FormGroup.get('envs')!.setValue(envs);
  }
}
