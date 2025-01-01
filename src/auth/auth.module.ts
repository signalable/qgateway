import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
import { AuthGuard } from './guards/auth.guard';
import { HttpClientModule } from '../http-client/http-client.module';

@Module({
  imports: [HttpClientModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
