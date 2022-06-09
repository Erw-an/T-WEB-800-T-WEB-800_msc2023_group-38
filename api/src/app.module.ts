import { GeoModule } from './geo/geo.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.envs/.${process.env.NODE_ENV}.env`,
            isGlobal: true,
        }),
        GeoModule,
    ],
})
export class AppModule {}
