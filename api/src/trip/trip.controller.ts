import { FileInterceptor } from '@nestjs/platform-express';
import { GetUser } from './../auth/decorator/get-user.decorator';
import { TripService } from './trip.service';
import {
    Controller,
    Get,
    UseGuards,
    Post,
    Patch,
    Param,
    Body,
    ParseIntPipe,
    UseInterceptors,
    UploadedFile,
} from '@nestjs/common';
import { JwtGuard } from 'src/auth/guard';

@UseGuards(JwtGuard)
@Controller('trip')
export class TripController {
    constructor(private tripService: TripService) {}

    @Get()
    async getTrips(@GetUser('id') userId: number) {
        const res = await this.tripService.getTrips(userId);
        return res;
    }

    @Post()
    async createTrip(@GetUser('id') userId: number) {
        const res = await this.tripService.createTrip(userId);
        return res;
    }

    @Patch('/:id/itinerary')
    async saveItinerary(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) tripId: number,
        @Body('content') content: JSON,
    ) {
        const res = await this.tripService.saveItinerary({
            userId,
            tripId,
            content,
        });
        return res;
    }

    @Get('/:id/itinerary/:itId')
    async getItinerary(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) tripId: number,
        @Param('itId', ParseIntPipe) itId: number,
    ) {
        const res = await this.tripService.getItinerary({
            userId,
            tripId,
            itId,
        });
        return res;
    }

    @Patch('/:id/itinerary/:itId')
    @UseInterceptors(FileInterceptor('itinerary_blob'))
    async saveItineraryFile(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) tripId: number,
        @Param('itId', ParseIntPipe) itineraryId: number,
        @UploadedFile() file: Express.Multer.File,
    ) {
        const res = this.tripService.saveItineraryFile({
            userId,
            tripId,
            itineraryId,
            file,
        });
        return res;
    }

    @Patch('/:id/itinerary/:itId/place')
    async savePlace(
        @GetUser('id') userId: number,
        @Param('id', ParseIntPipe) tripId: number,
        @Param('itId', ParseIntPipe) itineraryId: number,
        @Body('content') content: JSON,
    ) {
        const res = await this.tripService.savePlace({
            userId,
            tripId,
            itineraryId,
            content,
        });
        return res;
    }
}
