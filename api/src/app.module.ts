import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { GeoModule } from './geo/geo.module';
import { Module } from '@nestjs/common';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.envs/.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        PrismaModule,
        GeoModule,
        AuthModule,
    ],
})
export class AppModule {}
