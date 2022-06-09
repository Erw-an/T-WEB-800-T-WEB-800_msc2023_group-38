import { GeoService } from './geo.service';
import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery } from '@nestjs/swagger';

@Controller('geo')
export class GeoController {
    constructor(private geoService: GeoService) {}

    @ApiOperation({
        description: 'Get adresses autocompleted',
    })
    @ApiQuery({
        name: 'q',
        description: 'Query string',
        type: String,
        required: true,
    })
    @Get('/adresses/autocomplete?')
    async autoComplete(@Query('q') q: string): Promise<any> {
        if (!(q.length > 3))
            throw new HttpException('Error', HttpStatus.I_AM_A_TEAPOT);
        const res = await this.geoService.autoComplete(q);
        return res;
    }
}
