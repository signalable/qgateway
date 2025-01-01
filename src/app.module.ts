import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CommonModule } from './common/common.module';
import { HttpClientModule } from './http-client/http-client.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule, CommonModule, HttpClientModule, AuthModule],
})
export class AppModule {}
