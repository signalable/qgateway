export interface AppConfig {
  port: number;
  env: string;
}

export interface AuthServiceConfig {
  url: string;
  timeout: number;
}

export interface UserServiceConfig {
  url: string;
  timeout: number;
}

export interface ThrottleConfig {
  ttl: number;
  limit: number;
}
