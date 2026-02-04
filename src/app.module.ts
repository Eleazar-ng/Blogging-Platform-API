import { Module } from '@nestjs/common';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { ThrottlerGuard } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AppConfigModule } from './config/config.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interface';
import { BlogModule } from './blog/blog.module';


@Module({
  imports: [
    AppConfigModule,
    DatabaseModule,
    AuthModule,
    UserModule,
    BlogModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})

export class AppModule {}
