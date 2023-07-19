import { Injectable } from '@angular/core';
import {
  IApiDockerContainer,
  IApiDockerImage,
} from 'projects/angorak/src/lib/interfaces/api.docker';
import { AngorakService } from 'projects/angorak/src/public-api';

@Injectable({
  providedIn: 'root',
})
export class DockerService {
  public Images: IApiDockerImage[] | undefined = undefined;
  public Containers: IApiDockerContainer[] | undefined = undefined;

  public Container: IApiDockerContainer | undefined | null = undefined; // undefined = loading, null = error

  public DockerImageCategoryMap = {
    database: 'پایگاه داده',
    app: 'برنامک',
    language: 'برنامه نوشته',
  };

  constructor(private anograk: AngorakService) {}

  public FetchDockerImages() {
    this.anograk.DockerImage.List().subscribe({
      next: (res) => {
        if (res.status == true) {
          this.Images = res.data;
        }
      },
      error: () => {
        this.Images = undefined;
      },
    });
  }

  public FetchDockerContainers() {
    this.anograk.DockerContainer.List().subscribe({
      next: (res) => {
        if (res.status == true) {
          this.Containers = res.data;
        }
      },
      error: () => {
        this.Containers = undefined;
      },
    });
  }

  public FetchAndSelectDockerContainer(key?: string) {
    if (this.Container == undefined && key == undefined) return;
    else if (key == undefined) key = this.Container!.key;
    if (key!.length < 5) {
      this.Container = null;
      return;
    }
    this.anograk.DockerContainer.One(key!).subscribe({
      next: (res) => {
        if (res.status) {
          this.Container = res.data;
        } else {
          this.Container = null;
        }
      },
      error: () => {
        this.Container = null;
      },
    });
  }

  public StartDockerContainer() {
    return this.anograk.DockerContainer.Start(this.Container!.key);
  }

  public StopDockerContainer() {
    return this.anograk.DockerContainer.Stop(this.Container!.key);
  }

  public RestartDockerContainer() {
    return this.anograk.DockerContainer.Restart(this.Container!.key);
  }

  public StatsDockerContainer() {
    return this.anograk.DockerContainer.Stats(this.Container!.key);
  }

  public LogsDockerContainer() {
    return this.anograk.DockerContainer.Logs(this.Container!.key);
  }

  public DeleteDockerContainer() {
    return this.anograk.DockerContainer.Delete(this.Container!.key);
  }
}
