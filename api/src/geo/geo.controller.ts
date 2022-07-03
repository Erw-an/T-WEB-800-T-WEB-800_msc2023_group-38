import { GetDirectionArgs, GetPlacesNearbyArgs } from 'src/dto';
import { GeoService } from './geo.service';
import {
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Query,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiOkResponse,
    ApiOperation,
    ApiParam,
    ApiQuery,
} from '@nestjs/swagger';

// https://wiki.openstreetmap.org/wiki/Key:amenity
export enum EAmenity {
    drink = 'drink',
    eat = 'eat',
    travel = 'travel',
    enjoy = 'enjoy',
    sleep = 'sleep',
}

export enum EProfile {
    drivingCar = 'driving-car',
}

// sleep TODO: Add booking with Booking API;
@Controller('geo')
export class GeoController {
    constructor(private geoService: GeoService) {}

    @ApiOperation({
        description: 'Endpoint to get adresses autocomplete.',
    })
    @ApiQuery({
        name: 'q',
        description: 'Query string to search for.',
        type: String,
        required: true,
    })
    @Get('/adresses/autocomplete?')
    async autoComplete(@Query('q') q: string): Promise<any> {
        if (!(q.length > 3))
            throw new HttpException('Bye', HttpStatus.I_AM_A_TEAPOT);
        const res = await this.geoService.autoComplete(q);
        return res;
    }

    @ApiOperation({
        description: 'Endpoint to get direction between two coordinates.',
    })
    @ApiQuery({
        name: 'latStart',
        description: 'Latitude of the starting point.',
        type: Number,
        required: true,
    })
    @ApiQuery({
        name: 'lngStart',
        description: 'Longitude of the starting point.',
        type: Number,
        required: true,
    })
    @ApiQuery({
        name: 'latEnd',
        description: 'Latitude of the ending point.',
        type: Number,
        required: true,
    })
    @ApiQuery({
        name: 'lngEnd',
        description: 'Longitude of the ending point.',
        type: Number,
        required: true,
    })
    @ApiQuery({
        name: 'profile',
        description: 'Transportation.',
        type: Number,
        required: true,
        enum: ['driving-car'],
    })
    @ApiOkResponse({
        description:
            'This description defines when a 200 (OK) is returned. For @Get-Annotated Endpoints this is always present. When, for example, using a @Post-Endpoint, a 201 Created is always present',
        schema: {
            type: 'string',
            example: 'Hello, Pete!',
            // For instructions on how to set a Schema, please refer to https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object-examples
        },
    })
    @ApiBadRequestResponse({
        description: 'This description is for a 400 response.',
    })
    @Get('/direction?')
    async getDirection(
        @Query('latStart') latStart: number,
        @Query('lngStart') lngStart: number,
        @Query('latEnd') latEnd: number,
        @Query('lngEnd') lngEnd: number,
        @Query('profile') profile?: EProfile,
    ) {
        if (!profile) {
            profile = EProfile.drivingCar;
        } else if (!Object.values(EProfile).includes(profile))
            throw new HttpException(
                'Not a valid profile',
                HttpStatus.BAD_REQUEST,
            );

        const args = new GetDirectionArgs({
            latStart,
            lngStart,
            latEnd,
            lngEnd,
            profile,
        });

        const res = await this.geoService.getDirection(args);
        return res;
    }

    @ApiOperation({
        description: 'Endpoint to get places near around coordinates.',
    })
    /// Request Documentation
    @ApiParam({
        name: 'amenity',
        description: 'Kind of amenity to look for.',
        allowEmptyValue: false,
        required: true,
        type: String,
        enum: ['drink', 'eat', 'travel', 'enjoy', 'sleep'],
    })
    @ApiQuery({
        name: 'radius',
        description:
            'Maximum distance around the coordinates to look for places.',
        type: Number,
        required: false,
    })
    @ApiQuery({
        name: 'lat',
        description: 'Latitude (coordinate).',
        type: Number,
        required: true,
    })
    @ApiQuery({
        name: 'lng',
        description: 'Longitude (coordinate).',
        type: Number,
        required: true,
    })
    // Response Documentation
    @ApiOkResponse({
        description:
            'This description defines when a 200 (OK) is returned. For @Get-Annotated Endpoints this is always present. When, for example, using a @Post-Endpoint, a 201 Created is always present',
        schema: {
            type: 'string',
            example: 'Hello, Pete!',
            // For instructions on how to set a Schema, please refer to https://github.com/OAI/OpenAPI-Specification/blob/main/versions/3.0.3.md#schema-object-examples
        },
    })
    @ApiBadRequestResponse({
        description: 'This description is for a 400 response.',
    })
    @Get('/places/:amenity?')
    async getPlacesNearby(
        @Param('amenity') amenity: EAmenity,
        @Query('radius') radius: number,
        @Query('lat') lat: number,
        @Query('lng') lng: number,
    ) {
        if (!amenity) {
            amenity = EAmenity.eat;
        } else if (!Object.values(EAmenity).includes(amenity))
            throw new HttpException(
                'Not a valid amenity',
                HttpStatus.BAD_REQUEST,
            );
        const args = new GetPlacesNearbyArgs({ lat, lng, amenity, radius });
        const res = await this.geoService.getPlacesNearby(args);
        return res;
    }
}
