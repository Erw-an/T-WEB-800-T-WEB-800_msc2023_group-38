import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GeoModule } from './geo/geo.module';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

@Module({
    imports: [
        // Global
        ConfigModule.forRoot({
            envFilePath: `.envs/.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        PrismaModule,
        GeoModule,
        AuthModule,
        TripModule,
    ],
})
export class AppModule {}
