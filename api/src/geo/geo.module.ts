import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { GeoService } from './geo.service';
import { GeoController } from './geo.controller';

@Module({
    imports: [HttpModule],
    providers: [GeoService],
    controllers: [GeoController],
})
export class GeoModule {}
