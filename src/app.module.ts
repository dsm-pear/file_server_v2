import { Global, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HttpErrorFilter } from './common/exception/exception.filter';
import { AdminJwtStrategy, JwtStrategy } from './common/strategy/jwt.strategy';
import { connectionOptions } from './config';
import { NoticeModule } from './notice/notice.module';
import { ReportModule } from './report/report.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [connectionOptions],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => config.get(process.env.NODE_ENV),
      inject: [ConfigService],
    }),
    JwtModule.register({}),
    NoticeModule,
    ReportModule,
  ],
  providers: [
    JwtStrategy,
    AdminJwtStrategy,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
  ],
})
export class AppModule {}
