export interface IApiTraefikRoute {
  id: number;
  name: string;
  domain: string;
  port: number;
  host: string;
  cert: boolean;
  protocol: 'http' | 'tcp';
}

export interface IApiTraefikRouteCreateParams {
  name: string;
  domain: string;
  port: number;
  host: string;
  cert: boolean;
  protocol: 'http' | 'tcp';
}
