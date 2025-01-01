import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';
import configuration from './configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      isGlobal: true, // 전역 모듈로 설정
      load: [configuration], // 설정 파일 로드
      envFilePath: '.env', // .env 파일 경로
      cache: true, // 캐싱 활성화
      expandVariables: true, // 환경 변수 확장 허용
      validate: (config: Record<string, unknown>) => {
        // 필수 환경 변수 검증
        const requiredEnvVars = ['PORT', 'AUTH_SERVICE_URL'];
        for (const envVar of requiredEnvVars) {
          if (!config[envVar]) {
            throw new Error(`Missing required environment variable: ${envVar}`);
          }
        }
        return config;
      },
    }),
  ],
})
export class ConfigModule {}
