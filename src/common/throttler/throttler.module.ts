import { Module } from '@nestjs/common';
import { ThrottlerModule as NestThrottlerModule } from '@nestjs/throttler';
import { ThrottlerConfigService } from './throttler-config.service';

@Module({
  imports: [
    NestThrottlerModule.forRootAsync({
      useClass: ThrottlerConfigService,
    }),
  ],
  exports: [NestThrottlerModule],
})
export class ThrottlerModule {}
