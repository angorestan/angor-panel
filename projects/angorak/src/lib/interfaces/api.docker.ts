export type TApiDockerImageCategory = 'database' | 'app' | 'language';

export interface IApiDockerImage {
  id: number;
  uuid: string; // make docker image unique
  key: string;
  image: string;
  tag: string;
  name: string;
  logo: string;
  category: 'database' | 'app' | 'language';
  mounts: IApiDockerImageMount[];
  ports: IApiDockerImagePort[];
  envs: IApiDockerImageEnv[];
}

export interface IApiDockerImageMount {
  key: string;
  source: string;
  hidden: true;
}

export interface IApiDockerImagePort {
  source: number;
  destination: number;
  hidden: boolean;
}

export interface IApiDockerImageEnv {
  key: string;
  text: string;
  type: 'string' | 'number' | 'boolean';
  value: any;
  hidden: boolean;
}

export interface IApiDockerImageListParams {
  category: TApiDockerImageCategory;
}

export type TApiDockerContainerStatus = 'create' | 'run' | 'stop';

export interface IApiDockerContainer {
  id: number;
  user: number; // user owner id
  key: string; // user docker container id
  container: IApiDockerContainerInspect;
  network: IApiDockerNetwork;
  volumes: IApiDockerVolume[];
  image: IApiDockerImage; // this will be in database for population
  envs: IApiDockerContainerEnv[];
  status: TApiDockerContainerStatus;
}

export interface IApiDockerContainerInspect {
  id: number;
  network: {
    aliases: string[];
    gateway: string;
    ipv4: string;
    ipv6: string;
    mac: string;
  };
}

export interface IApiDockerContainerVolume {
  id: number; // volume id in database
  volumeId: string;
  source: string;
}

export interface IApiDockerContainerEnv {
  key: string;
  value: any;
}

export interface IApiDockerContainerCreateParams {
  key: string;
  image: string; // image key
  envs: object;
}

export interface IApiDockerContainerStats {
  cpu: number;
  memory: number;
  network: {
    eth0: {
      rx_bytes: number;
      rx_packets: number;
      rx_errors: number;
      rx_dropped: number;
      tx_bytes: number;
      tx_packets: number;
      tx_errors: number;
      tx_dropped: number;
    };
  };
  timestamp: number;
}

export interface IApiDockerNetwork {
  id: number;
  user: number; // user owner id
  key: string; // user docker network id
  networkId: string;
  ip: string;
}

export interface IApiDockerVolume {
  id: number;
  user: number; // user owner id
  key: string; // user docker network id
  volumeId: string;
  mountPath: string;
}
